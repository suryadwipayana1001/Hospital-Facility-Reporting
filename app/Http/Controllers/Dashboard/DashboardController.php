<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Report;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $name = $request->input('name');

        $reports = collect(); 

        if ($request->isMethod('post') && $name) {
            $reports = Report::query()
                ->where('name', 'like', "%{$name}%")
                ->latest()
                ->paginate(5);
        }

        return Inertia::render('Dashboard/Index', [
            'reports' => $reports,
            'filters' => [
                'name' => $name,
                'submitted' => $request->isMethod('post'),
            ],
        ]);
    }
}
