<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $fillable = [
        'custom_id',
        'name',
        'positions',
        'room',
        'facility',
        'category',
        'description',
        'status',
        'note',
        'process_image',
        'image',
        'created_by',
        'updated_by',
        'processed_at',
        'completed_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function histories()
    {
        return $this->hasMany(ReportHistory::class)->orderBy('created_at', 'asc');
    }
    public function getImageUrlAttribute()
    {
        return $this->image 
            ? asset('storage/' . $this->image) 
            : null;
    }
    public function getProcessImageUrlAttribute()
    {
    return $this->process_image 
        ? asset('storage/' . $this->process_image)
        : null;
        }
}
