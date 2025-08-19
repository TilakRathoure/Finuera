"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  Upload,
  FileText,
  Image,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Dashboard, ErrResponse, Homeinfo } from "@/lib/types";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { DarkModeContext } from "@/lib/darkmode";
import { redirect } from "next/navigation";

const Homeabout: Homeinfo[] = [
  {
    title: "Smart Categorization",
    description:
      "Automatically categorize your expenses with AI-powered insights",
    icon: PieChart,
    color: "text-blue-500",
  },
  {
    title: "Visual Analytics",
    description:
      "Beautiful charts and graphs to understand your spending patterns",
    icon: BarChart3,
    color: "text-green-500",
  },
  {
    title: "AI Financial Advisor",
    description:
      "Get personalized financial advice from VedAI based on your data",
    icon: Brain,
    color: "text-purple-500",
  },
];

const UploadPage = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const {setdashboard}=useContext(DarkModeContext);

  const handleDrag =(e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop =(e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    handleFileInput();

  };

  const handleFileInput =
    (e?: React.ChangeEvent<HTMLInputElement>) => {
      const file = e?.target.files?.[0];

      if (!file) return;

      const validFile =
        file.type == "text/csv" ||
        file.type == "application/pdf" ||
file.type.startsWith("image/")

      if (validFile) setFile(file);
      else{
        toast.error("only csv, pdf and images allowed");
        console.log(file.type);
      }
    }

  const removeFile = () => {
    setFile(null);
  };

  const getFileIcon = (file: File) => {
    if (file.type === "text/csv")
      return <FileText className="h-8 w-8 text-green-500" />;
    if (file.type === "application/pdf")
      return <File className="h-8 w-8 text-red-500" />;
    if (file.type.startsWith("image/"))
      return <Image className="h-8 w-8 text-blue-500" />;
    return <File className="h-8 w-8 text-muted-foreground" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleUpload = async () => {

    if(!file) return toast.error("No file added");
    setUploading(true);

    try{

      const formdata=new FormData();
      formdata.set("file",file);
      
      const {data} =await axios.post("api/file",formdata);

      console.log(data.data);
      setdashboard(data.data);

      setUploadComplete(true);


    }catch(error){
      const err=error as AxiosError;
      const message=err.response?.data as ErrResponse;
      toast.error(message.message);
    }
    
    finally{
      setUploading(false);
    }


  };

  useEffect(()=>{

    if(!file) return;

    window.scrollTo(0,200)

  },[file])

  return (
    <div className="min-h-screen bg-background pt-[80px]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Upload Your Financial Data
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Upload CSV files, PDFs, or photos to get instant financial insights
            and AI-powered advice from VedAI
          </p>
        </div>

        
        <Card className="mb-8 bg-gradient-to-br from-primary/20 via-primary/12 to-primary/0">
          <CardContent className="p-0">
            <div
              className={`relative border-2 border-dashed rounded-lg m-6 p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-950/20"
                  : "border-muted-foreground/25 hover:border-blue-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept=".csv,.pdf,image/*"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950/50 rounded-full">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Drop your file here
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    or click to browse your computer
                  </p>

                  <div className="flex justify-center space-x-6 text-sm">
                    <Badge
                      variant="outline"
                      className="flex items-center space-x-1"
                    >
                      <Image className="h-3 w-3 text-blue-500" />
                      <span>Images</span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center space-x-1"
                    >
                      <FileText className="h-3 w-3 text-green-500" />
                      <span>CSV</span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className="flex items-center space-x-1"
                    >
                      <File className="h-3 w-3 text-red-500" />
                      <span>PDF</span>
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {file && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Selected File</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={removeFile}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {file && (
          <div className="text-center mb-8">
            <Button
              onClick={handleUpload}
              disabled={uploading}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : uploadComplete ? (
                <Link href="/dashboard" className="flex">
                  <Check className="mr-2 h-4 w-4" />
                  Upload Complete! Click for Dashboard
                </Link>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Analyze with VedAI
                </>
              )}
            </Button>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {Homeabout.map((e, i) => (
            <Card key={i} className="text-center">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-50 dark:bg-green-950/50 rounded-full mb-4">
                  <e.icon className={`h-6 w-6 ${e.color}`} />
                </div>
                <CardTitle className="text-base mb-2">{e.title}</CardTitle>
                <CardDescription>{e.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950/20 dark:border-blue-800">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <div className="space-y-1">
              <p className="font-semibold mb-2">Tips for better analysis:</p>
              <ul className="text-sm space-y-1 list-disc list-inside ml-2">
                <li>
                  CSV files should include columns for date, amount, and
                  description
                </li>
                <li>
                  PDF bank statements work best when they&apos;re text-based
                  (not scanned images)
                </li>
                <li>For photos, ensure receipts are clear and well-lit</li>
                <li>Multiple file types supported: CSV, PDF, and images</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default UploadPage;
