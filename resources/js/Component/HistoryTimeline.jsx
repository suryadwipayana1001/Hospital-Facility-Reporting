import React from 'react';
import ImageZoom from './ImageZoom';

export default function HistoryTimeline({ histories }) {
    if (!histories || histories.length === 0) return null;

    return (
        <div className="card mt-4 shadow-sm" style={{ borderRadius: '8px', border: '1px solid #e3e6f0' }}>
            <div className="card-header bg-light py-3 d-flex align-items-center">
                <h5 className="card-title mb-0" style={{ fontWeight: 'bold', color: '#4e73df', fontSize: '16px' }}>
                    <span style={{ marginRight: '8px' }}>🕒</span> Riwayat Aktivitas & Perkembangan Laporan
                </h5>
            </div>
            <div className="card-body">
                <div style={{ position: 'relative', paddingLeft: '30px' }}>
                    {/* Vertical Timeline Line */}
                    <div 
                        style={{
                            position: 'absolute',
                            left: '11px',
                            top: '5px',
                            bottom: '5px',
                            width: '2px',
                            backgroundColor: '#e3e6f0',
                        }}
                    />

                    {histories.map((item, index) => {
                        let badgeColor = '#ffc107'; // yellow for diajukan
                        let iconColor = '#ffc107';
                        if (item.status === 'Sedang diproses') {
                            badgeColor = '#17a2b8'; // blue
                            iconColor = '#17a2b8';
                        } else if (item.status === 'Selesai diproses') {
                            badgeColor = '#28a745'; // green
                            iconColor = '#28a745';
                        }

                        const dateStr = new Date(item.created_at).toLocaleString('id-ID', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        });

                        return (
                            <div key={item.id} style={{ position: 'relative', marginBottom: index === histories.length - 1 ? 0 : '25px' }}>
                                {/* Timeline Circle Node */}
                                <div 
                                    style={{
                                        position: 'absolute',
                                        left: '-26px',
                                        top: '4px',
                                        width: '14px',
                                        height: '14px',
                                        borderRadius: '50%',
                                        backgroundColor: '#fff',
                                        border: `3px solid ${iconColor}`,
                                        boxShadow: '0 0 0 3px #fff',
                                        zIndex: 2,
                                    }}
                                />

                                {/* Timeline Content Box */}
                                <div>
                                    <div className="d-flex align-items-center mb-1 flex-wrap">
                                        <span 
                                            className="badge text-white px-2 py-1" 
                                            style={{ 
                                                backgroundColor: badgeColor, 
                                                fontSize: '11px', 
                                                borderRadius: '4px',
                                                marginRight: '10px'
                                            }}
                                        >
                                            {item.status}
                                        </span>
                                        <small className="text-muted" style={{ fontWeight: '500' }}>
                                            {dateStr} WITA
                                        </small>
                                        <span className="mx-2 text-muted" style={{ fontSize: '12px' }}>•</span>
                                        <small className="text-dark" style={{ fontWeight: '600' }}>
                                            Oleh: {item.user?.name || 'Sistem'}
                                        </small>
                                    </div>
                                    
                                    <div 
                                        className="p-3 bg-light mt-2" 
                                        style={{ 
                                            borderLeft: `3px solid ${badgeColor}`, 
                                            borderRadius: '6px',
                                            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                                            backgroundColor: '#f8f9fc'
                                        }}
                                    >
                                        <p className="mb-0" style={{ fontSize: '13.5px', color: '#495057', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                                            {item.note || 'Tidak ada catatan.'}
                                        </p>

                                        {item.image && (
                                            <div className="mt-3">
                                                <p className="text-muted mb-1" style={{ fontSize: '11px', fontWeight: 'bold' }}>Lampiran Foto:</p>
                                                <ImageZoom 
                                                    src={`/storage/${item.image}`}
                                                    alt={`Bukti Foto - ${item.status}`}
                                                    style={{ 
                                                        maxHeight: '120px', 
                                                        borderRadius: '4px', 
                                                        boxShadow: '0 2px 5px rgba(0,0,0,0.08)' 
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
