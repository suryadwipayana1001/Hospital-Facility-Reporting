import React, { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import Header from "../../Layouts/Header";
import Sidebar from "../../Layouts/Sidebar";
import Footer from "../../Layouts/Footer";

function EditReport({ auth, report }) {
    const { errors } = usePage().props;

    const [name, setName] = useState(report.name);
    const [positions, setPositions] = useState(report.positions);
    const [room, setRoom] = useState(report.room);
    const [facility, setFacility] = useState(report.facility);
    const [description, setDescription] = useState(report.description);
    const [status, setStatus] = useState(report.status ?? "Sedang diajukan");
    const [note, setNote] = useState(report.note ?? "");
    const [image, setImage] = useState(null);

    const [localErrors, setLocalErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Nama pelapor tidak boleh kosong !";
        if (!positions.trim()) newErrors.positions = "Jabatan tidak boleh kosong !";
        if (!room.trim()) newErrors.room = "Ruangan tidak boleh kosong !";
        if (!facility.trim()) newErrors.facility = "Fasilitas tidak boleh kosong !";
        if (!description.trim()) newErrors.description = "Deskripsi tidak boleh kosong !";
        if (!status.trim()) newErrors.status = "Status tidak boleh kosong";

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }

        setLocalErrors({});
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("positions", positions);
        formData.append("room", room);
        formData.append("facility", facility);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("note", note);
        if (image) {
            formData.append("image", image);
        }
        formData.append("_method", "PUT"); // karena pakai Inertia PUT

        Inertia.post(`/reports/${report.id}`, formData, {
            forceFormData: true,
            onFinish: () => setLoading(false),
        });
    };

    useEffect(() => {
        const channel = window.Echo.channel("reports")
            .listen(".ReportCreated", (e) => {
                if (auth.user.level === "teknisi") {
                    const audio = new Audio("/dist/sound/dingdong.mp3");
                    audio.play().catch(err => console.error("Gagal play sound:", err));
                }
            });
        return () => {
            channel.stopListening(".ReportCreated");
        };
    }, [auth.user.level]);

    return (
        <>
            <Header user={auth.user} />
            <Sidebar active="reports" level={auth.user.level} />
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Edit Pengaduan</h1>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">
                        <div className="col-md-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Form Ubah Laporan</h3>
                                </div>
                                <div className="card-body">

                                    {/* Nama Pelapor */}
                                    <div className="form-group">
                                        <label>Nama Pelapor</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        {localErrors.name && <div className="text-danger">{localErrors.name}</div>}
                                        {errors.name && <div className="text-danger">{errors.name}</div>}
                                    </div>

                                    {/* Jabatan */}
                                    <div className="form-group">
                                        <label>Jabatan</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={positions}
                                            onChange={(e) => setPositions(e.target.value)}
                                        />
                                        {localErrors.positions && <div className="text-danger">{localErrors.positions}</div>}
                                        {errors.positions && <div className="text-danger">{errors.positions}</div>}
                                    </div>

                                    {/* Ruangan */}
                                    <div className="form-group">
                                        <label>Ruangan</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={room}
                                            onChange={(e) => setRoom(e.target.value)}
                                        />
                                        {localErrors.room && <div className="text-danger">{localErrors.room}</div>}
                                        {errors.room && <div className="text-danger">{errors.room}</div>}
                                    </div>

                                    {/* Fasilitas */}
                                    <div className="form-group">
                                        <label>Fasilitas</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={facility}
                                            onChange={(e) => setFacility(e.target.value)}
                                        />
                                        {localErrors.facility && <div className="text-danger">{localErrors.facility}</div>}
                                        {errors.facility && <div className="text-danger">{errors.facility}</div>}
                                    </div>

                                    {/* Deskripsi */}
                                    <div className="form-group">
                                        <label>Deskripsi</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        {localErrors.description && <div className="text-danger">{localErrors.description}</div>}
                                        {errors.description && <div className="text-danger">{errors.description}</div>}
                                    </div>

                                    {/* Status */}
                                    <div className="form-group">
                                        <label>Status</label>
                                        <select
                                            className="form-control"
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="Sedang diajukan">Sedang diajukan</option>
                                            <option value="Sedang diproses">Sedang diproses</option>
                                            <option value="Selesai diproses">Selesai diproses</option>
                                        </select>
                                        {localErrors.status && <div className="text-danger">{localErrors.status}</div>}
                                        {errors.status && <div className="text-danger">{errors.status}</div>}
                                    </div>

                                    {/* Catatan */}
                                    <div className="form-group">
                                        <label>Catatan</label>
                                        <textarea
                                            className="form-control"
                                            rows="2"
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        />
                                    </div>

                                    {/* Upload Image */}
                                    <div className="form-group">
                                        <label>Upload Gambar</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                        {errors.image && <div className="text-danger">{errors.image}</div>}
                                        {report.image && (
                                            <div className="mt-2">
                                                <p>Gambar saat ini:</p>
                                                <img
                                                    src={`/storage/${report.image}`} 
                                                    alt="Report"
                                                    style={{ maxHeight: "200px" }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Tombol Aksi */}
                                <div className="row mb-3">
                                    <div className="col d-flex justify-content-end">
                                        <button
                                            onClick={() => Inertia.get("/reports", {}, { preserveState: false })}
                                            className="btn btn-danger mr-2"
                                            disabled={loading}
                                        >
                                            Kembali
                                        </button>
                                        <button
                                            onClick={handleSubmit}
                                            className="btn btn-primary mr-3"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm mr-2"></span>
                                                    Menyimpan...
                                                </>
                                            ) : (
                                                "Simpan"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default EditReport;
