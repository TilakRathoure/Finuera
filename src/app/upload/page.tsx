"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  File,
  X,
  Check,
  AlertCircle,
  Loader2,
  PieChart,
  BarChart3,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ErrResponse } from "@/types/api";
import { Homeinfo } from "@/types/home";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { DarkModeContext } from "@/providers/dark-mode";
import { cn } from "@/lib/utils";
import {
  InkItem,
  InkStagger,
  MaskSlide,
  Reveal,
} from "@/components/ui/motion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const Homeabout: Homeinfo[] = [
  {
    title: "Smart categorization",
    description:
      "Expenses sorted automatically so patterns surface without busywork.",
    icon: PieChart,
    color: "text-brand",
  },
  {
    title: "Visual analytics",
    description:
      "Charts built for scanning — months, categories, and trends at a glance.",
    icon: BarChart3,
    color: "text-brand",
  },
  {
    title: "VedAI advisor",
    description: "Ask follow-ups on the same data you just uploaded.",
    icon: Brain,
    color: "text-brand",
  },
];

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const reduce = useReducedMotion();

  const { setdashboard } = useContext(DarkModeContext);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const dropped = e.dataTransfer.files?.[0];
    if (!dropped) return;

    validateAndSetFile(dropped);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    validateAndSetFile(selected);
  };

  const validateAndSetFile = (nextFile: File) => {
    const validFile =
      nextFile.type === "text/csv" ||
      nextFile.type === "application/pdf" ||
      nextFile.type.startsWith("image/");

    if (validFile) {
      setFile(nextFile);
      setUploadComplete(false);
    } else {
      toast.error("Only CSV, PDF, and images allowed");
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadComplete(false);
  };

  const getFileIcon = (selected: File) => {
    if (selected.type === "text/csv")
      return <FileText className="h-7 w-7 text-brand" />;
    if (selected.type === "application/pdf")
      return <File className="h-7 w-7 text-muted-foreground" />;
    if (selected.type.startsWith("image/"))
      return <ImageIcon className="h-7 w-7 text-brand" />;
    return <File className="h-7 w-7 text-muted-foreground" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleUpload = async () => {
    if (uploadComplete) return;

    if (!file) return toast.error("No file added");
    setUploading(true);

    try {
      const formdata = new FormData();
      formdata.set("file", file);

      const { data } = await axios.post("api/file", formdata);

      setdashboard(data.data);
      setUploadComplete(true);
    } catch (error) {
      const err = error as AxiosError;
      const data = err.response?.data as ErrResponse;
      toast.error(`Please Try Again. ${data.message}`);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!file) return;
    window.scrollTo({ top: 160, behavior: "smooth" });
  }, [file]);

  return (
    <div className="page-shell atmosphere-muted page-offset min-h-screen pb-16">
      <div className="section-container max-w-3xl py-6 md:py-10">
        <Reveal className="mb-8 text-center">
          <h1 className="font-display mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Upload your data
          </h1>
          <p className="mx-auto max-w-xl text-base text-muted-foreground">
            CSV, PDF, or a clear photo — Finuera reads it, then VedAI explains
            it.
          </p>
        </Reveal>

        <MaskSlide delay={0.08}>
          <div
            className={cn(
              "relative border border-dashed px-6 py-10 text-center transition-[border-color,background-color] duration-300 md:px-8 md:py-12",
              dragActive
                ? "border-brand bg-brand/5"
                : "border-border bg-card/40 hover:border-brand/40"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".csv,.pdf,image/*"
              onChange={handleFileInput}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />

            <div className="pointer-events-none flex flex-col items-center gap-3">
              <Upload className="h-9 w-9 text-brand" />
              <div>
                <h3 className="font-display mb-1.5 text-lg font-semibold">
                  Drop your file here
                </h3>
                <p className="text-sm text-muted-foreground">
                  or click to browse · Images · CSV · PDF
                </p>
              </div>
            </div>
          </div>
        </MaskSlide>

        <AnimatePresence>
          {file && (
            <motion.div
              initial={
                reduce ? false : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
              }
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={
                reduce
                  ? undefined
                  : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
              }
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 space-y-4"
            >
              <div className="flex items-center justify-between border border-border/70 bg-card/90 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  {getFileIcon(file)}
                  <div className="min-w-0">
                    <p className="truncate font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeFile}
                  className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  size="lg"
                  className="min-w-[14rem]"
                  asChild={uploadComplete}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : uploadComplete ? (
                    <Link href="/dashboard">
                      <Check className="mr-2 h-4 w-4" />
                      Open dashboard
                    </Link>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Analyze with VedAI
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <InkStagger className="mt-8 grid gap-6 border-t border-border pt-8 md:grid-cols-3 md:gap-8">
          {Homeabout.map((item, i) => (
            <InkItem key={i}>
              <div className="text-center md:text-left">
                <item.icon
                  className={`mb-3 h-5 w-5 ${item.color} mx-auto md:mx-0`}
                />
                <h3 className="font-display mb-1.5 text-base font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </InkItem>
          ))}
        </InkStagger>

        <Alert className="mt-8 border-brand/20 bg-brand/5">
          <AlertCircle className="h-4 w-4 text-brand" />
          <AlertDescription className="text-foreground/80">
            <p className="mb-2 font-medium">Tips for cleaner analysis</p>
            <ul className="ml-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>
                CSV files should include columns for date, amount, and
                description
              </li>
              <li>
                PDF bank statements work best when they&apos;re text-based (not
                scanned images)
              </li>
              <li>For photos, ensure receipts are clear and well-lit</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default UploadPage;
