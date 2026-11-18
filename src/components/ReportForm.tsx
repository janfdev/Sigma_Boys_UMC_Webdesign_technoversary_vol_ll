"use client";

import React, { useState } from "react";
import { WasteDropReport, TrailId, WasteCategory, CircularTargetProduct } from "@/types";
import { validateReportInput, generateReportId, calculateWasteImpact } from "@/lib/reportUtils";
import {
  Recycle,
  PackageCheck,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Navigation,
  Copy,
  Check,
  Sprout,
  Sparkles,
  Printer,
  Mountain,
  Award,
  Clock,
  PlusCircle,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedNumber } from "@/components/ui/animated-number";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast-stack";
import { cn } from "@/lib/utils";

interface ReportFormProps {
  initialTrail?: TrailId;
  onReportSubmitted?: (report: WasteDropReport) => void;
}

export const getCommunityHubName = (trailId: string): string => {
  switch (trailId) {
    case "PALUTUNGAN":
      return "Workshop Eco-Paving Desa (Kuningan)";
    case "APUY":
      return "Sentra Biokonversi Maggot BSF (Majalengka)";
    case "LINGGARJATI":
      return "Bank Sampah Unit Mitra Warga";
    case "SADAREHE":
      return "Drop-Box Titik Kumpul Relawan Aksi";
    default:
      return "Layanan Penjemputan / Komunitas";
  }
};

export default function ReportForm({ initialTrail = "PALUTUNGAN", onReportSubmitted }: ReportFormProps) {
  const [formData, setFormData] = useState({
    reporterName: "",
    reporterContact: "",
    trail: initialTrail,
    locationDetail: "",
    wasteCategory: "PLASTIC_PET" as WasteCategory,
    weightKg: "2.5",
    canisterCount: "2",
    targetProduct: "PAVING_BLOCK" as CircularTargetProduct,
    rewardChoice: "SEEDLING" as "SEEDLING" | "COMMUNITY_POINTS" | "BADGE_CERTIFICATE",
    description: "",
    lat: "",
    lng: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<WasteDropReport | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [copiedTicket, setCopiedTicket] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("GPS Tidak Didukung", {
        description: "Browser Anda tidak mendukung deteksi lokasi otomatis.",
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setFormData((prev) => ({
          ...prev,
          lat: pos.coords.latitude.toFixed(6),
          lng: pos.coords.longitude.toFixed(6),
        }));
        toast.info("Koordinat GPS Ditemukan", {
          description: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
        });
      },
      (err) => {
        setIsLocating(false);
        toast.warning("Gagal Mengambil GPS", {
          description: err.message,
        });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const coords =
      formData.lat && formData.lng
        ? { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) }
        : undefined;

    const parsedWeight = parseFloat(formData.weightKg) || 1.0;
    const parsedCanisters = parseInt(formData.canisterCount, 10) || 0;

    const payload: Partial<WasteDropReport> = {
      reporterName: formData.reporterName,
      reporterContact: formData.reporterContact,
      trail: formData.trail,
      locationDetail: formData.locationDetail,
      wasteCategory: formData.wasteCategory,
      weightKg: parsedWeight,
      canisterCount: parsedCanisters,
      targetProduct: formData.targetProduct,
      rewardChoice: formData.rewardChoice,
      description: formData.description,
      coordinates: coords,
    };

    const validation = validateReportInput(payload);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      toast.error("Formulir Belum Lengkap", {
        description: "Periksa kembali kolom yang bertanda merah sebelum mengirim.",
      });
      return;
    }

    // Generate Ticket ID matching CRG-YYYYMM-XXX
    const randomCounter = Math.floor(Math.random() * 800) + 100;
    const reportId = generateReportId(randomCounter);

    const completeReport: WasteDropReport = {
      id: reportId,
      reporterName: formData.reporterName.trim(),
      reporterContact: formData.reporterContact.trim(),
      trail: formData.trail,
      locationDetail: formData.locationDetail.trim(),
      coordinates: coords,
      wasteCategory: formData.wasteCategory,
      weightKg: parsedWeight,
      canisterCount: parsedCanisters,
      targetProduct: formData.targetProduct,
      rewardChoice: formData.rewardChoice,
      description: formData.description.trim(),
      timestamp: new Date().toISOString(),
      status: "VERIFIED",
      adminNote: `Setoran sampah terverifikasi untuk disalurkan ke ${getCommunityHubName(formData.trail)}. Diolah oleh komunitas sirkular CircuLife.`,
    };

    // Save to LocalStorage
    try {
      const existing = localStorage.getItem("circulife_citizen_reports");
      const list: WasteDropReport[] = existing ? JSON.parse(existing) : [];
      list.unshift(completeReport);
      localStorage.setItem("circulife_citizen_reports", JSON.stringify(list));
    } catch {
      // LocalStorage fallback
    }

    setSubmittedReport(completeReport);
    setIsSubmitting(false);

    toast.success("Setoran Sampah Berhasil Diverifikasi!", {
      description: `Tiket digital ${reportId} diterbitkan untuk ${getCommunityHubName(formData.trail)}.`,
      duration: 6000,
    });

    if (onReportSubmitted) {
      onReportSubmitted(completeReport);
    }
  };

  const handleCopyTicket = () => {
    if (!submittedReport) return;
    navigator.clipboard.writeText(submittedReport.id);
    setCopiedTicket(true);
    toast.info("Tiket Berhasil Disalin", {
      description: `Nomor tiket ${submittedReport.id} siap dibagikan ke relawan komunitas.`,
    });
    setTimeout(() => setCopiedTicket(false), 2000);
  };

  const handlePrintTicket = () => {
    window.print();
  };

  const handleResetForm = () => {
    setSubmittedReport(null);
    setFormData({
      reporterName: "",
      reporterContact: "",
      trail: initialTrail,
      locationDetail: "",
      wasteCategory: "PLASTIC_PET",
      weightKg: "2.5",
      canisterCount: "2",
      targetProduct: "PAVING_BLOCK",
      rewardChoice: "SEEDLING",
      description: "",
      lat: "",
      lng: "",
    });
    setErrors({});
  };

  if (submittedReport) {
    return (
      <Card className="overflow-hidden border border-emerald-500/30 bg-gradient-to-b from-card via-card to-emerald-950/10 text-foreground shadow-lg rounded-3xl">
        <div className="bg-emerald-950/80 px-6 py-6 border-b border-emerald-500/20 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400 text-emerald-950 font-black shadow-md">
                <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-emerald-400/40 bg-emerald-500/20 text-emerald-200 text-[10px] font-mono font-bold uppercase tracking-wider">
                    CircuLife Community Verified
                  </Badge>
                  <span className="text-[11px] text-emerald-300 font-mono truncate max-w-[200px] sm:max-w-none">
                    {getCommunityHubName(submittedReport.trail)}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5">
                  Setoran Sampah Berhasil Diverifikasi Komunitas
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 print:hidden self-end sm:self-auto">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handlePrintTicket}
                className="gap-1.5 text-xs font-bold border-emerald-400/30 bg-emerald-900/40 text-emerald-100 hover:bg-emerald-800/60 rounded-xl"
              >
                <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Cetak Bukti</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCopyTicket}
                className="gap-1.5 text-xs font-bold border-emerald-400/30 bg-emerald-900/40 text-emerald-100 hover:bg-emerald-800/60 rounded-xl"
              >
                {copiedTicket ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Salin Tiket</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Ticket Body */}
          <div className="rounded-2xl border border-emerald-500/20 bg-muted/30 p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block font-mono">
                  Nomor Tiket Penyetoran Komunitas
                </span>
                <span className="text-2xl sm:text-3xl font-black text-foreground tabular-nums tracking-wider font-mono">
                  {submittedReport.id}
                </span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block font-mono">
                  Waktu Verifikasi
                </span>
                <span className="text-xs font-mono text-foreground font-semibold flex items-center sm:justify-end gap-1.5 mt-0.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-800 dark:text-emerald-300" />
                  {new Date(submittedReport.timestamp).toLocaleString("id-ID", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 rounded-xl bg-card border border-border/60">
                <span className="text-[10px] text-muted-foreground block uppercase font-bold">Penyetor / Kontributor</span>
                <span className="font-semibold text-foreground text-sm block mt-0.5 truncate">{submittedReport.reporterName}</span>
                <span className="text-[10px] text-muted-foreground">{submittedReport.reporterContact}</span>
              </div>

              <div className="p-3 rounded-xl bg-card border border-border/60">
                <span className="text-[10px] text-muted-foreground block uppercase font-bold">Hub Komunitas Tujuan</span>
                <span className="font-semibold text-foreground text-sm block mt-0.5 truncate">
                  {getCommunityHubName(submittedReport.trail)}
                </span>
                <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-semibold truncate block">
                  {submittedReport.locationDetail || "Kawasan Lereng Ciremai"}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-card border border-border/60">
                <span className="text-[10px] text-muted-foreground block uppercase font-bold">Sampah Terverifikasi</span>
                <span className="font-semibold text-foreground text-sm block mt-0.5">
                  {submittedReport.weightKg} kg
                </span>
                <span className="text-[10px] text-muted-foreground truncate block">{submittedReport.wasteCategory}</span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="text-[10px] text-emerald-800 dark:text-emerald-300 block uppercase font-bold">Reward Komunitas</span>
                <span className="font-bold text-foreground text-sm flex items-center gap-1 mt-0.5">
                  <Sprout className="h-4 w-4 text-emerald-800 dark:text-emerald-300 shrink-0" />
                  <span className="truncate">
                    {submittedReport.rewardChoice === "SEEDLING"
                      ? "Bibit Pohon Saninten"
                      : submittedReport.rewardChoice === "COMMUNITY_POINTS"
                      ? "Poin Komunitas"
                      : "E-Sertifikat Ciremai"}
                  </span>
                </span>
                <span className="text-[10px] text-muted-foreground">Siap diambil di hub mitra</span>
              </div>
            </div>

            {submittedReport.description && (
              <div className="p-3 rounded-xl bg-card border border-border/60 text-xs">
                <span className="text-[10px] text-muted-foreground block font-mono font-bold uppercase mb-1">
                  Catatan Rincian Sampah
                </span>
                <p className="text-muted-foreground leading-relaxed">{submittedReport.description}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              Tunjukkan nomor tiket ini ke relawan atau pengurus hub komunitas CircuLife untuk penyerahan sampah &amp; klaim bibit pohon.
            </p>
            <Button
              type="button"
              onClick={handleResetForm}
              className="gap-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 w-full sm:w-auto"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Input Setoran Baru</span>
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Live impact calculation
  const parsedWeight = parseFloat(formData.weightKg) || 0;
  const parsedCanister = parseInt(formData.canisterCount, 10) || 0;
  const plasticKg =
    formData.wasteCategory === "ORGANIC"
      ? 0
      : formData.wasteCategory === "MIXED_ANORGANIC"
      ? parsedWeight * 0.7
      : formData.wasteCategory === "PLASTIC_PET"
      ? parsedWeight
      : 0;
  const organicKg = formData.wasteCategory === "ORGANIC" ? parsedWeight : 0;
  const liveImpact = calculateWasteImpact(plasticKg, organicKg, parsedCanister);

  return (
    <Card className="overflow-hidden border border-border/80 bg-card shadow-sm rounded-3xl">
      {/* Community Themed Header */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-950 via-[#0b1b13] to-card px-6 py-7 sm:px-8 text-white border-b border-emerald-500/20">
        <div aria-hidden="true" className="absolute -right-8 -top-8 h-48 w-48 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="border-emerald-400/40 bg-emerald-500/20 text-emerald-200 text-[10px] font-mono font-bold uppercase tracking-wider gap-1.5">
            <Users className="h-3 w-3" />
            <span>Komunitas Sirkular CircuLife</span>
          </Badge>
          <span className="text-[11px] text-emerald-300/80 font-mono">Pusat Aksi Warga &amp; Relawan</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
          Formulir Penyetoran Sampah Komunitas
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
          Salurkan sampah terpilah anorganik dan organik Anda ke jejaring workshop komunitas CircuLife untuk dikonversi menjadi Eco-Paving Block, Kompos Kasgot, atau Bibit Pohon Saninten.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-7">
        {/* Section 1: Identitas Kontributor & Hub Komunitas */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-border/60">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold">
              01
            </div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
              Identitas Kontributor &amp; Hub Komunitas Tujuan
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reporterName" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Nama Pelapor / Kontributor <span className="text-destructive">*</span>
              </label>
              <Input
                id="reporterName"
                type="text"
                value={formData.reporterName}
                onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                placeholder="Contoh: Rian Pratama / Komunitas Hijau"
                aria-invalid={!!errors.reporterName}
                aria-describedby={errors.reporterName ? "reporterName-error" : undefined}
                className={cn("h-11 rounded-xl transition-all focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500", errors.reporterName && "border-destructive")}
              />
              {errors.reporterName && (
                <p id="reporterName-error" className="mt-1 text-xs text-destructive flex items-center gap-1" role="alert">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.reporterName}</span>
                </p>
              )}
            </div>

            <div>
              <label htmlFor="reporterContact" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Nomor Kontak WhatsApp / Telp <span className="text-destructive">*</span>
              </label>
              <Input
                id="reporterContact"
                type="tel"
                value={formData.reporterContact}
                onChange={(e) => setFormData({ ...formData, reporterContact: e.target.value })}
                placeholder="081234567890"
                aria-invalid={!!errors.reporterContact}
                aria-describedby={errors.reporterContact ? "reporterContact-error" : undefined}
                className={cn("h-11 rounded-xl tabular-nums transition-all focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500", errors.reporterContact && "border-destructive")}
              />
              {errors.reporterContact && (
                <p id="reporterContact-error" className="mt-1 text-xs text-destructive flex items-center gap-1" role="alert">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.reporterContact}</span>
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="trail" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Tujuan Penyaluran / Hub Komunitas <span className="text-destructive">*</span>
              </label>
              <Select
                value={formData.trail}
                onValueChange={(val) => setFormData({ ...formData, trail: val as TrailId })}
              >
                <SelectTrigger
                  id="trail"
                  aria-label="Tujuan Penyaluran / Hub Komunitas"
                  size="lg"
                  className="w-full rounded-xl border-input bg-card text-foreground focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500"
                >
                  <SelectValue placeholder="Pilih Hub Komunitas Sirkular" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-border bg-popover text-popover-foreground shadow-xl">
                  <SelectGroup>
                    <SelectLabel className="text-[10px] font-mono uppercase text-muted-foreground px-2 py-1.5">
                      Jejaring Hub &amp; Workshop Komunitas CircuLife
                    </SelectLabel>
                    <SelectItem value="PALUTUNGAN" className="rounded-lg py-2 cursor-pointer">
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className="font-semibold">Workshop Eco-Paving Desa</span>
                        <span className="text-[11px] text-muted-foreground">Kuningan</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="APUY" className="rounded-lg py-2 cursor-pointer">
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className="font-semibold">Sentra Biokonversi Maggot BSF</span>
                        <span className="text-[11px] text-muted-foreground">Majalengka</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="LINGGARJATI" className="rounded-lg py-2 cursor-pointer">
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className="font-semibold">Bank Sampah Unit Mitra Warga</span>
                        <span className="text-[11px] text-muted-foreground">Desa Penyangga</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="SADAREHE" className="rounded-lg py-2 cursor-pointer">
                      <div className="flex items-center justify-between w-full gap-2">
                        <span className="font-semibold">Drop-Box Titik Kumpul Relawan Aksi</span>
                        <span className="text-[11px] text-muted-foreground">Basecamp Relawan</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="NON_TRAIL" className="rounded-lg py-2 cursor-pointer">
                      <span className="text-muted-foreground">Layanan Penjemputan Mandiri / Event Komunitas</span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="locationDetail" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Patokan Lokasi Asal Sampah <span className="text-destructive">*</span>
              </label>
              <Input
                id="locationDetail"
                type="text"
                value={formData.locationDetail}
                onChange={(e) => setFormData({ ...formData, locationDetail: e.target.value })}
                placeholder="Contoh: Pemukiman Desa Cisantana / Area Camp Lereng / Basecamp Komunitas"
                aria-invalid={!!errors.locationDetail}
                aria-describedby={errors.locationDetail ? "locationDetail-error" : undefined}
                className={cn("h-11 rounded-xl transition-all focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500", errors.locationDetail && "border-destructive")}
              />
              {errors.locationDetail && (
                <p id="locationDetail-error" className="mt-1 text-xs text-destructive flex items-center gap-1" role="alert">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{errors.locationDetail}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Timbangan Sampah & Kategori */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-border/60">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold">
              02
            </div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
              Timbangan &amp; Klasifikasi Sampah Terpilah
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label htmlFor="wasteCategory" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Kategori Sampah Terpilah
              </label>
              <Select
                value={formData.wasteCategory}
                onValueChange={(val) => setFormData({ ...formData, wasteCategory: val as WasteCategory })}
              >
                <SelectTrigger
                  id="wasteCategory"
                  aria-label="Kategori Sampah Terpilah"
                  size="lg"
                  className="w-full rounded-xl border-input bg-card text-foreground focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500"
                >
                  <SelectValue placeholder="Pilih Kategori Sampah" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-border bg-popover text-popover-foreground shadow-xl">
                  <SelectItem value="PLASTIC_PET" className="rounded-lg py-2 cursor-pointer">
                    Botol Plastik PET &amp; Sachet
                  </SelectItem>
                  <SelectItem value="GAS_CANISTER" className="rounded-lg py-2 cursor-pointer">
                    Kaleng Gas Portabel Bekas (Metal)
                  </SelectItem>
                  <SelectItem value="ORGANIC" className="rounded-lg py-2 cursor-pointer">
                    Sampah Organik Logistik (Kasgot)
                  </SelectItem>
                  <SelectItem value="MIXED_ANORGANIC" className="rounded-lg py-2 cursor-pointer">
                    Limbah Anorganik Campuran
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="weightKg" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Estimasi Berat Sampah (kg)
              </label>
              <div className="relative">
                <Input
                  id="weightKg"
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={formData.weightKg}
                  onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                  placeholder="2.5"
                  className="h-11 rounded-xl tabular-nums pr-12 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500"
                />
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-muted-foreground">
                  kg
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="canisterCount" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Jumlah Kaleng Gas (Unit)
              </label>
              <div className="relative">
                <Input
                  id="canisterCount"
                  type="number"
                  min="0"
                  value={formData.canisterCount}
                  onChange={(e) => setFormData({ ...formData, canisterCount: e.target.value })}
                  placeholder="2"
                  className="h-11 rounded-xl tabular-nums pr-14 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500"
                />
                <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-muted-foreground">
                  kaleng
                </span>
              </div>
            </div>
          </div>

          {/* Live Circular Impact Preview HUD */}
          <div className="p-4 sm:p-5 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-950/20 via-card to-emerald-950/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <Recycle className="h-4 w-4" aria-hidden="true" />
                <span>Simulasi Dampak Sirkular Terpadu (Live HUD)</span>
              </span>
              <Badge variant="outline" className="text-[10px] font-mono border-emerald-500/30 text-emerald-800 dark:text-emerald-300 bg-emerald-500/10">
                Community Eco-Impact
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
              <div className="p-3 rounded-xl bg-card border border-border/70 shadow-xs">
                <span className="block text-[10px] font-mono text-muted-foreground uppercase font-bold">Paving Block</span>
                <span className="text-base sm:text-lg font-black text-foreground font-mono tabular-nums">
                  <AnimatedNumber value={liveImpact.pavingBlocks} /> <span className="text-[10px] font-normal text-muted-foreground">unit</span>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border/70 shadow-xs">
                <span className="block text-[10px] font-mono text-muted-foreground uppercase font-bold">Pupuk Kompos</span>
                <span className="text-base sm:text-lg font-black text-foreground font-mono tabular-nums">
                  <AnimatedNumber value={liveImpact.compostKg} /> <span className="text-[10px] font-normal text-muted-foreground">kg</span>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border/70 shadow-xs">
                <span className="block text-[10px] font-mono text-muted-foreground uppercase font-bold">Reduksi Emisi</span>
                <span className="text-base sm:text-lg font-black text-foreground font-mono tabular-nums">
                  <AnimatedNumber value={liveImpact.co2SavedKg} /> <span className="text-[10px] font-normal text-muted-foreground">kg CO2e</span>
                </span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 shadow-xs">
                <span className="block text-[10px] font-mono text-emerald-800 dark:text-emerald-300 uppercase font-bold">Poin Komunitas</span>
                <span className="text-base sm:text-lg font-black text-emerald-800 dark:text-emerald-300 font-mono tabular-nums">
                  +<AnimatedNumber value={liveImpact.seedlingPoints} /> <span className="text-[10px] font-normal text-muted-foreground">pts</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Pemanfaatan Sirkular & Reward */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-1 border-b border-border/60">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-bold">
              03
            </div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground">
              Alokasi Pemanfaatan &amp; Pilihan Reward Komunitas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="targetProduct" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Target Pemanfaatan Daur Ulang
              </label>
              <Select
                value={formData.targetProduct}
                onValueChange={(val) => setFormData({ ...formData, targetProduct: val as CircularTargetProduct })}
              >
                <SelectTrigger
                  id="targetProduct"
                  aria-label="Target Pemanfaatan Daur Ulang"
                  size="lg"
                  className="w-full rounded-xl border-input bg-card text-foreground focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500"
                >
                  <SelectValue placeholder="Pilih Pemanfaatan Daur Ulang" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-border bg-popover text-popover-foreground shadow-xl">
                  <SelectItem value="PAVING_BLOCK" className="rounded-lg py-2 cursor-pointer">
                    Eco-Paving Block Jalan Setapak Desa (K-250)
                  </SelectItem>
                  <SelectItem value="UPCYCLED_METAL" className="rounded-lg py-2 cursor-pointer">
                    Tungku Ultralight &amp; Asbak Logam Kaleng Gas
                  </SelectItem>
                  <SelectItem value="COMPOST" className="rounded-lg py-2 cursor-pointer">
                    Kompos Kasgot Persemaian Bibit Pohon
                  </SelectItem>
                  <SelectItem value="ECO_SOUVENIR" className="rounded-lg py-2 cursor-pointer">
                    Tas Etnik Anyaman Sachet Ramah Lingkungan
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
                Pilihan Reward Lingkungan
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "SEEDLING", label: "Bibit Pohon", desc: "Saninten Ciremai", icon: Sprout },
                  { id: "COMMUNITY_POINTS", label: "Poin Komunitas", desc: "Katalog Sirkular", icon: Sparkles },
                  { id: "BADGE_CERTIFICATE", label: "E-Sertifikat", desc: "Kontributor Hijau", icon: Award },
                ].map((r) => {
                  const Icon = r.icon;
                  const isSelected = formData.rewardChoice === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, rewardChoice: r.id as any })}
                      className={cn(
                        "p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-20",
                        isSelected
                          ? "border-emerald-500 bg-emerald-500/10 text-foreground ring-1 ring-emerald-500/30"
                          : "border-border/80 bg-card hover:bg-muted/40 text-muted-foreground"
                      )}
                    >
                      <Icon className={cn("h-4 w-4", isSelected ? "text-emerald-800 dark:text-emerald-300" : "text-muted-foreground")} />
                      <div>
                        <span className={cn("block text-[11px] font-bold leading-tight", isSelected && "text-foreground")}>
                          {r.label}
                        </span>
                        <span className="text-[9px] text-muted-foreground block truncate">{r.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* GPS Location helper */}
          <Card className="p-4 border-border/80 bg-muted/20 rounded-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5 font-mono">
                <MapPin className="h-4 w-4 text-emerald-800 dark:text-emerald-300" aria-hidden="true" />
                <span>Koordinat GPS Lokasi Temuan (Opsional)</span>
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGetLocation}
                disabled={isLocating}
                className="h-8 gap-1.5 text-xs font-bold rounded-lg border-border/70 hover:border-emerald-500/40"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>Mendeteksi Lokasi...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="h-3.5 w-3.5 text-emerald-800 dark:text-emerald-300" />
                    <span>Ambil GPS Saya</span>
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                step="any"
                id="report-lat"
                aria-label="Garis Lintang (Latitude)"
                value={formData.lat}
                onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
                placeholder="Latitude (cth: -6.8921)"
                className="h-9 text-xs tabular-nums rounded-lg"
              />
              <Input
                type="number"
                step="any"
                id="report-lng"
                aria-label="Garis Bujur (Longitude)"
                value={formData.lng}
                onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
                placeholder="Longitude (cth: 108.4012)"
                className="h-9 text-xs tabular-nums rounded-lg"
              />
            </div>
            {errors.coordinates && (
              <p id="coordinates-error" className="mt-1.5 text-xs text-destructive" role="alert">
                {errors.coordinates}
              </p>
            )}
          </Card>
        </div>

        {/* Section 4: Rincian Deskripsi */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-xs font-bold uppercase tracking-wider text-foreground mb-1.5">
            Rincian Sampah Terpilah <span className="text-destructive">*</span>
          </label>
          <Textarea
            id="description"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Jelaskan jenis sampah yang disetorkan (cth: 15 botol PET 600ml, 2 kaleng gas kompor kosong, sampah bersih tanpa sisa cairan)..."
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "description-error" : undefined}
            className={cn("min-h-24 rounded-xl transition-all focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500", errors.description && "border-destructive")}
          />
          {errors.description && (
            <p id="description-error" className="mt-1 text-xs text-destructive flex items-center gap-1" role="alert">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.description}</span>
            </p>
          )}
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 gap-2 text-sm font-bold shadow-md bg-emerald-600 hover:bg-emerald-500 text-white dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:text-emerald-950 rounded-2xl cursor-pointer transition-all active:scale-[0.99]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Memproses Verifikasi Sampah...</span>
              </>
            ) : (
              <>
                <PackageCheck className="h-4 w-4" aria-hidden="true" />
                <span>Kirim Data Setoran &amp; Dapatkan Tiket</span>
              </>
            )}
          </Button>
          <p className="text-[11px] text-muted-foreground text-center mt-2.5">
            Data setoran akan langsung tercatat di sistem sirkularitas komunitas CircuLife dan siap diserahkan ke hub pengolahan warga.
          </p>
        </div>
      </form>
    </Card>
  );
}
