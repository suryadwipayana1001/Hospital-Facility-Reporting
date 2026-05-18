<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('report_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained('reports')->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('status');
            $table->text('note')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });

        // Isi riwayat otomatis untuk data pengaduan lama yang sudah ada di database
        $reports = DB::table('reports')->get();
        foreach ($reports as $report) {
            // 1. Catat riwayat saat awal diajukan
            DB::table('report_histories')->insert([
                'report_id'  => $report->id,
                'user_id'    => $report->created_by ?? null,
                'status'     => 'Sedang diajukan',
                'note'       => $report->description,
                'image'      => $report->image,
                'created_at' => $report->created_at,
                'updated_at' => $report->created_at,
            ]);

            // 2. Jika status saat ini sudah "Sedang diproses" atau "Selesai diproses", buat riwayat kelanjutannya
            if ($report->status !== 'Sedang diajukan') {
                DB::table('report_histories')->insert([
                    'report_id'  => $report->id,
                    'user_id'    => $report->updated_by ?? null,
                    'status'     => $report->status,
                    'note'       => $report->note,
                    'image'      => $report->process_image,
                    'created_at' => $report->updated_at,
                    'updated_at' => $report->updated_at,
                ]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_histories');
    }
};
