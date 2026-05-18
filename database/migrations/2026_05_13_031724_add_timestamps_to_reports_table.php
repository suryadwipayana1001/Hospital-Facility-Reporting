<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->timestamp('processed_at')->nullable()->after('status');
            $table->timestamp('completed_at')->nullable()->after('processed_at');
        });

        // Backfill existing data from report_histories
        try {
            $reports = DB::table('reports')->get();
            foreach ($reports as $report) {
                $processed = DB::table('report_histories')
                    ->where('report_id', $report->id)
                    ->where('status', 'Sedang diproses')
                    ->orderBy('created_at', 'asc')
                    ->first();

                $completed = DB::table('report_histories')
                    ->where('report_id', $report->id)
                    ->where('status', 'Selesai diproses')
                    ->orderBy('created_at', 'asc')
                    ->first();

                DB::table('reports')
                    ->where('id', $report->id)
                    ->update([
                        'processed_at' => $processed ? $processed->created_at : null,
                        'completed_at' => $completed ? $completed->created_at : null,
                    ]);
            }
        } catch (\Exception $e) {
            // Ignore backfill errors if tables are empty
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reports', function (Blueprint $table) {
            $table->dropColumn(['processed_at', 'completed_at']);
        });
    }
};
