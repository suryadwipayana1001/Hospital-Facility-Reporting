<?php

namespace App\Events;

use App\Models\Report;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ReportCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $report;

    public function __construct(Report $report)
    {
        // pastikan model sudah load relasi biar di frontend datanya lengkap
        $this->report = $report->load('user');
    }

    public function broadcastOn()
    {
        // channel publik "reports"
        return new Channel('reports');
    }

    public function broadcastAs()
    {
        // nama event yang didengar di frontend
        return 'ReportCreated';
    }
}
