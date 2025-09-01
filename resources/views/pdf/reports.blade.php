<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Laporan Kerusakan - RS Windu Husada</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 12px;
            color: #333;
        }
        header {
            text-align: center;
            padding-bottom: 10px;
            border-bottom: 3px solid #2a9d8f;
            margin-bottom: 20px;
        }
        header img {
            height: 70px;
        }
        header h2 {
            margin: 5px 0;
            color: #0066cc;
        }
        header p {
            margin: 2px 0;
            color: #28a745;
            font-size: 14px;
        }
        .periode {
            margin-top: 5px;
            font-size: 13px;
            color: #444;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }
        table th {
            background-color: #0066cc;
            color: white;
            padding: 6px;
            text-align: left;
            font-size: 12px;
        }
        table td {
            padding: 6px;
            border: 1px solid #ddd;
            font-size: 11.5px;
        }
        .rekap {
            margin-top: 15px;
            font-size: 13px;
            width: 60%;
        }
        .rekap td {
            border: 1px solid #ccc;
            padding: 6px;
        }
        .rekap .diajukan {
            background-color: #fff3cd;
        }
        .rekap .diproses {
            background-color: #cce5ff;
        }
        .rekap .selesai {
            background-color: #d4edda;
        }
        .rekap .total {
            font-weight: bold;
            background-color: #f2f2f2;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 10px;
            color: #666;
            border-top: 1px solid #ccc;
            padding-top: 5px;
        }
    </style>
</head>
<body>
    <header>
        <img src="{{ public_path('dist/img/logo.jpg') }}" alt="Logo">
        <h2>Rumah Sakit Windu Husada</h2>
        <p>Laporan Kerusakan Sarana & Prasarana</p>

        <div class="periode">
            @if($startDate && $endDate)
                <strong>Periode:</strong> 
                {{ \Carbon\Carbon::parse($startDate)->translatedFormat('d-m-Y') }}
                s/d 
                {{ \Carbon\Carbon::parse($endDate)->translatedFormat('d-m-Y') }}
            @else
                <!-- <strong>Periode:</strong> Semua Tanggal -->
            @endif
        </div>
    </header>

    <!-- Rekap Status -->
    <div>
        <strong>Ringkasan Status:</strong>
        <table class="rekap">
            <tr class="diajukan">
                <td>Sedang diajukan</td>
                <td style="text-align:center;">{{ $totals['diajukan'] }}</td>
            </tr>
            <tr class="diproses">
                <td>Sedang diproses</td>
                <td style="text-align:center;">{{ $totals['diproses'] }}</td>
            </tr>
            <tr class="selesai">
                <td>Selesai diproses</td>
                <td style="text-align:center;">{{ $totals['selesai'] }}</td>
            </tr>
            <tr class="total">
                <td>Total Laporan</td>
                <td style="text-align:center;">{{ $totals['total'] }}</td>
            </tr>
        </table>
    </div>

    <!-- Tabel Detail -->
    <table>
        <thead>
            <tr>
                <th style="width: 8%;">ID</th>
                <th style="width: 18%;">Nama</th>
                <th style="width: 15%;">Posisi</th>
                <th style="width: 15%;">Ruangan</th>
                <th style="width: 15%;">Fasilitas</th>
                <th style="width: 20%;">Deskripsi</th>
                <th style="width: 9%;">Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($reports as $r)
            <tr>
                <td>{{ $r->custom_id }}</td>
                <td>{{ $r->name }}</td>
                <td>{{ $r->positions }}</td>
                <td>{{ $r->room }}</td>
                <td>{{ $r->facility }}</td>
                <td>{{ $r->description }}</td>
                <td>{{ $r->status }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="7" style="text-align:center; padding:10px;">Tidak ada data laporan</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div class="footer">
        &copy; {{ date('Y') }} Rumah Sakit Windu Husada - Sistem Pelaporan Kerusakan
    </div>
</body>
</html>
