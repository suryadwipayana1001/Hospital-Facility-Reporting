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

  // 🔹 Bedakan dua file upload
  const [mainImage, setMainImage] = useState(null);       // Foto awal
  const [processImage, setProcessImage] = useState(null); // Foto selesai/diproses

  const [localErrors, setLocalErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const newErrors = {};
  
    // Validasi dasar
    if (!name.trim()) newErrors.name = "Nama pelapor tidak boleh kosong!";
    if (!positions.trim()) newErrors.positions = "Jabatan tidak boleh kosong!";
    if (!room.trim()) newErrors.room = "Ruangan tidak boleh kosong!";
    if (!facility.trim()) newErrors.facility = "Fasilitas tidak boleh kosong!";
    if (!description.trim()) newErrors.description = "Deskripsi tidak boleh kosong!";
    if (!status.trim()) newErrors.status = "Status tidak boleh kosong!";
  
    // ✅ Cek apakah foto lama valid (bukan null, undefined, kosong, atau "null" string)
    const hasOldProcessImage =
      report.process_image &&
      typeof report.process_image === "string" &&
      report.process_image !== "" &&
      report.process_image !== "null";
  
    // ✅ Wajib upload foto hanya jika status selesai & belum ada sama sekali
    if (status === "Selesai diproses" && !processImage && !hasOldProcessImage) {
      newErrors.process_image = "Foto selesai wajib diunggah jika status selesai diproses!";
    }
  
    // Jika ada error, hentikan
    if (Object.keys(newErrors).length > 0) {
      console.log("⛔ Validasi gagal:", newErrors);
      setLocalErrors(newErrors);
      return;
    }
  
    setLocalErrors({});
    setLoading(true);
  
    // Kirim form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("positions", positions);
    formData.append("room", room);
    formData.append("facility", facility);
    formData.append("description", description);
    formData.append("status", status);
    formData.append("note", note);
  
    if (mainImage) formData.append("image", mainImage);
    if (processImage) formData.append("process_image", processImage);
  
    formData.append("_method", "PUT");
  
    Inertia.post(`/reports/${report.id}`, formData, {
      forceFormData: true,
      onFinish: () => setLoading(false),
    });
  };   
  
  useEffect(() => {
    const channel = window.Echo.channel("reports").listen(".ReportCreated", (e) => {
      if (auth.user.level === "teknisi") {
        const audio = new Audio("/dist/sound/dingdong.mp3");
        audio.play().catch((err) => console.error("Gagal play sound:", err));
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

                  {/* Foto Selesai */}
                    <div className="form-group">
                    <label>Foto Selesai</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setProcessImage(e.target.files[0])}
                    />

                    {/* ✅ Error hanya tampil jika belum ada foto lama */}
                    {!report.process_image && (localErrors.process_image || errors.process_image) && (
                        <div className="text-danger">
                        {localErrors.process_image || errors.process_image}
                        </div>
                    )}

                    {/* ✅ Tampilkan foto lama jika ada */}
                    {report.process_image && (
                        <div className="mt-2">
                        <p>Foto saat ini:</p>
                        <img
                            src={`/storage/${report.process_image}`}
                            alt="Process"
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
