<?php

namespace App\Http\Controllers\Report;
use Barryvdh\DomPDF\Facade\Pdf; 
use App\Http\Controllers\Controller;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::with('user')->latest()->get();;

        return Inertia::render('Reports/Index', [
            'reports' => $reports,
        ]);
    }

    public function create()
    {
        return Inertia::render('Reports/Create');
    }

    public function store(Request $request)
    {
    $messages = [
        'required' => ':attribute tidak boleh kosong !',
    ];
    $attributes = [
        'name'        => 'nama',
        'positions'   => 'posisi',
        'room'        => 'ruangan',
        'facility'    => 'fasilitas',
        'description' => 'deskripsi',
    ];
    $request->validate([
        'name'        => 'required|string|max:255',
        'positions'   => 'required|string|max:255',
        'room'        => 'required|string|max:255',
        'facility'    => 'required|string|max:255',
        'description' => 'required|string',
    ],$messages,$attributes);

    $lastReport = Report::latest('id')->first();

    $nextNumber = $lastReport ? ((int) str_replace('NP', '', $lastReport->custom_id)) + 1 : 1;

    $customId = 'NP' . $nextNumber;

    $report = Report::create([
        'custom_id'   => $customId,
        'name'        => $request->name,
        'positions'   => $request->positions,
        'room'        => $request->room,
        'facility'    => $request->facility,
        'description' => $request->description,
        'status'      => 'Sedang diajukan',
        'note'        => '',
        'created_by'  => auth()->id(),
    ]);
    event(new \App\Events\ReportCreated($report));

    return redirect()->route('reports.index')
        ->with('success', 'Report created successfully.');
    }

    public function show(Report $report)
    {
        $report->load(['creator', 'updater']); 
    
        return Inertia::render('Reports/Show', [
            'report' => $report,
        ]);
    }
    
    public function edit(Report $report)
    {
        return Inertia::render('Reports/Edit', [
            'report' => $report,
        ]);
    }

    public function update(Request $request, Report $report)
    {
        $messages = [
            'required' => ':attribute tidak boleh kosong !',
        ];
        $attributes = [
            'name'        => 'nama',
            'positions'   => 'posisi',
            'room'        => 'ruangan',
            'facility'    => 'fasilitas',
            'description' => 'deskripsi',
        ];
        $request->validate([
            'name'        => 'required|string|max:255',
            'positions'   => 'required|string|max:255',
            'room'        => 'required|string|max:255',
            'facility'    => 'required|string|max:255',
            'description' => 'required|string',
            'status'      => 'required|string',
            'note'        => 'nullable|string',
        ], $messages,$attributes);

        $data = $request->all();
        $data['note'] = $request->note ?? '-';
        $data['updated_by'] = auth()->id();
        $report->update($data);

        return redirect()->route('reports.index')
            ->with('success', 'Report updated successfully.');
    }

    public function destroy(Report $report)
    {
        $report->delete();
        return redirect()->route('reports.index')
            ->with('success', 'Report deleted successfully.');
    }

    public function report(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate   = $request->input('end_date');

        $query = Report::query();

        if ($startDate && $endDate) {
            $query->whereBetween('created_at', [
                Carbon::parse($startDate)->startOfDay(),
                Carbon::parse($endDate)->endOfDay(),
            ]);
        }

        $reports = $query->latest()->get();
        $totalReports = $reports->count();

        return Inertia::render('Reports/ReportIndex', [
            'reports'      => $reports,
            'totalReports' => $totalReports,
            'filters'      => [
                'start_date' => $startDate,
                'end_date'   => $endDate,
            ],
        ]);
    }

    public function exportPdf(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate   = $request->input('end_date');

        $query = Report::query();

        if ($startDate && $endDate) {
            $query->whereBetween('created_at', [
                \Carbon\Carbon::parse($startDate)->startOfDay(),
                \Carbon\Carbon::parse($endDate)->endOfDay()
            ]);
        }

        $reports = $query->latest()->get();

        $totals = [
            'diajukan'  => $reports->where('status', 'Sedang diajukan')->count(),
            'diproses'  => $reports->where('status', 'Sedang diproses')->count(),
            'selesai'   => $reports->where('status', 'Selesai diproses')->count(),
            'total'     => $reports->count(),
        ];

        $pdf = Pdf::loadView('pdf.reports', [
            'reports' => $reports,
            'totals'  => $totals,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);

        return $pdf->download('laporan-kerusakan.pdf');
    }
}
