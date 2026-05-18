<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <style>
        .title {
            font-size: 16px;
            font-weight: bold;
            color: #0066cc;
            text-align: center;
        }
        .subtitle {
            font-size: 14px;
            font-weight: bold;
            color: #28a745;
            text-align: center;
        }
        .periode {
            font-size: 11px;
            text-align: center;
            color: #555;
        }
        .table-header {
            background-color: #0066cc;
            color: #ffffff;
            font-weight: bold;
            text-align: center;
        }
        .rekap-header {
            background-color: #e2e3e5;
            font-weight: bold;
        }
        .diajukan {
            background-color: #fff3cd;
            color: #856404;
        }
        .diproses {
            background-color: #cce5ff;
            color: #004085;
        }
        .selesai {
            background-color: #d4edda;
            color: #155724;
        }
        .total {
            font-weight: bold;
            background-color: #f2f2f2;
        }
        td {
            vertical-align: middle;
        }
    </style>
</head>
<body>
    <!-- Title and Subtitle -->
    <table>
        <tr>
            <td colspan="10" class="title" style="text-align: center; font-size: 16px; font-weight: bold; color: #0066cc; font-family: sans-serif;">Rumah Sakit Windu Husada</td>
        </tr>
        <tr>
            <td colspan="10" class="subtitle" style="text-align: center; font-size: 13px; font-weight: bold; color: #28a745; font-family: sans-serif;">Laporan Kerusakan Sarana & Prasarana</td>
        </tr>
        @if($startDate && $endDate)
        <tr>
            <td colspan="10" class="periode" style="text-align: center; font-size: 11px; color: #555; font-family: sans-serif;">
                Periode: {{ \Carbon\Carbon::parse($startDate)->translatedFormat('d-m-Y') }} s/d {{ \Carbon\Carbon::parse($endDate)->translatedFormat('d-m-Y') }}
            </td>
        </tr>
        @endif
        <tr>
            <td colspan="10"></td>
        </tr>
    </table>

    <!-- Rekap Status -->
    <table border="1" style="border-collapse: collapse; font-family: sans-serif;">
        <thead>
            <tr>
                <th colspan="2" style="background-color: #f2f2f2; text-align: left; padding: 5px;"><strong>Ringkasan Status:</strong></th>
            </tr>
        </thead>
        <tbody>
            @if (empty($status))
                <tr class="diajukan">
                    <td style="padding: 5px; background-color: #fff3cd; color: #856404;">Sedang diajukan</td>
                    <td style="text-align: center; padding: 5px; background-color: #fff3cd; color: #856404; font-weight: bold;">{{ $totals['diajukan'] }}</td>
                </tr>
                <tr class="diproses">
                    <td style="padding: 5px; background-color: #cce5ff; color: #004085;">Sedang diproses</td>
                    <td style="text-align: center; padding: 5px; background-color: #cce5ff; color: #004085; font-weight: bold;">{{ $totals['diproses'] }}</td>
                </tr>
                <tr class="selesai">
                    <td style="padding: 5px; background-color: #d4edda; color: #155724;">Selesai diproses</td>
                    <td style="text-align: center; padding: 5px; background-color: #d4edda; color: #155724; font-weight: bold;">{{ $totals['selesai'] }}</td>
                </tr>
                <tr class="total">
                    <td style="padding: 5px; background-color: #f2f2f2; font-weight: bold;">Total Laporan</td>
                    <td style="text-align: center; padding: 5px; background-color: #f2f2f2; font-weight: bold;">{{ $totals['total'] }}</td>
                </tr>
            @else
                @if ($status === 'Sedang diajukan')
                    <tr class="diajukan">
                        <td style="padding: 5px; background-color: #fff3cd; color: #856404;">Sedang diajukan</td>
                        <td style="text-align: center; padding: 5px; background-color: #fff3cd; color: #856404; font-weight: bold;">{{ $totals['diajukan'] }}</td>
                    </tr>
                @elseif ($status === 'Sedang diproses')
                    <tr class="diproses">
                        <td style="padding: 5px; background-color: #cce5ff; color: #004085;">Sedang diproses</td>
                        <td style="text-align: center; padding: 5px; background-color: #cce5ff; color: #004085; font-weight: bold;">{{ $totals['diproses'] }}</td>
                    </tr>
                @elseif ($status === 'Selesai diproses')
                    <tr class="selesai">
                        <td style="padding: 5px; background-color: #d4edda; color: #155724;">Selesai diproses</td>
                        <td style="text-align: center; padding: 5px; background-color: #d4edda; color: #155724; font-weight: bold;">{{ $totals['selesai'] }}</td>
                    </tr>
                @endif
                <tr class="total">
                    <td style="padding: 5px; background-color: #f2f2f2; font-weight: bold;">Total Laporan</td>
                    <td style="text-align: center; padding: 5px; background-color: #f2f2f2; font-weight: bold;">{{ $totals['total'] }}</td>
                </tr>
            @endif
        </tbody>
    </table>

    <br>

    <!-- Detail Table -->
    <table border="1" style="border-collapse: collapse; font-family: sans-serif;">
        <thead>
            <tr style="background-color: #0066cc; color: #ffffff;">
                <th style="background-color: #0066cc; color: #ffffff; font-weight: bold; padding: 8px;">No Pengaduan</th>
                <th style="background-color: #0066cc; color: #ffffff; font-weight: bold; padding: 8px; width: 150px;">Nama</th>
                <th style="background-color: #0066cc; color: #ffffff; font-weight: bold; padding: 8px; width: 100px;">Kategori</th>
                <th style="background-color: #0066cc; color: #ffffff; font-weight: bold; padding: 8px; width: 120px;">Ruangan</th>
                <th style="background-color: #0066cc; color: #ffffff; font-weight: bold; padding: 8px; width: 120px;">Fasilitas</th>
                <th style="background-color: #0066cc; color: #ffffff; font-weight: bold; padding: 8px; width: 250px;">Deskripsi</th>
                <th style="background-color: #0066cc; color: #ffffff; font-weight: bold; padding: 8px; width: 120px;">Status</th>
                <th style="background-color: #0066cc; color: #ffffff; font-weight: bold; padding: 8px; width: 150px;">Tanggal Buat</th>
                <th style="background-color: #0066cc; color: #ffffff; font-weight: bold; padding: 8px; width: 150px;">Tanggal Proses</th>
                <th style="background-color: #0066cc; color: #ffffff; font-weight: bold; padding: 8px; width: 150px;">Tanggal Selesai</th>
            </tr>
        </thead>
        <tbody>
            @forelse($reports as $r)
                <tr>
                    <td style="padding: 6px; text-align: left;">{{ $r->custom_id }}</td>
                    <td style="padding: 6px;">{{ $r->name }}</td>
                    <td style="padding: 6px;">{{ $r->category ?? '-' }}</td>
                    <td style="padding: 6px;">{{ $r->room }}</td>
                    <td style="padding: 6px;">{{ $r->facility }}</td>
                    <td style="padding: 6px;">{{ $r->description }}</td>
                    
                    @if($r->status === 'Sedang diajukan')
                        <td style="padding: 6px; background-color: #fff3cd; color: #856404; text-align: center;">{{ $r->status }}</td>
                    @elseif($r->status === 'Sedang diproses')
                        <td style="padding: 6px; background-color: #cce5ff; color: #004085; text-align: center;">{{ $r->status }}</td>
                    @elseif($r->status === 'Selesai diproses')
                        <td style="padding: 6px; background-color: #d4edda; color: #155724; text-align: center;">{{ $r->status }}</td>
                    @else
                        <td style="padding: 6px; text-align: center;">{{ $r->status }}</td>
                    @endif

                    <td style="padding: 6px; text-align: center;">{{ \Carbon\Carbon::parse($r->created_at)->timezone('Asia/Makassar')->format('d/m/Y H:i') }}</td>
                    <td style="padding: 6px; text-align: center;">{{ $r->processed_at ? \Carbon\Carbon::parse($r->processed_at)->timezone('Asia/Makassar')->format('d/m/Y H:i') : '-' }}</td>
                    <td style="padding: 6px; text-align: center;">{{ $r->completed_at ? \Carbon\Carbon::parse($r->completed_at)->timezone('Asia/Makassar')->format('d/m/Y H:i') : '-' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="10" style="text-align: center; padding: 10px;">Tidak ada data laporan</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>
