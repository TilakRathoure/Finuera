
import { NextRequest, NextResponse } from 'next/server';
import {google} from "@/app/api/chatbot/route";
import { generateText } from 'ai';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const SUPPORTED_TYPES = [
  'text/csv',
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif'
];

export const POST=async(request: NextRequest)=>{
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    const instructions ='Analyze this file and provide a comprehensive summary of its contents.';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!SUPPORTED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Only CSV, PDF, and images are allowed.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    let response = '';

    try {
      if (file.type === 'text/csv') {

        const csvText = new TextDecoder().decode(arrayBuffer);
        
        const result = await generateText({
          model: google('gemini-1.5-flash'),
          messages: [
            {
              role: 'user',
              content: `Here is a CSV file content. Please follow these instructions: ${instructions}\n\nCSV Content:\n${csvText}`
            }
          ]
        });
        
        response = result.text;
        
      } else {
        const uint8Array = new Uint8Array(arrayBuffer);
        
        const result = await generateText({
          model: google('gemini-1.5-flash'),
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Please analyze this ${file.type.startsWith('image/') ? 'image' : 'PDF'} file and follow these instructions: ${instructions}`
                },
                file.type.startsWith('image/') ? {
                  type: 'image',
                  image: uint8Array,
                  mediaType:file.type,
                } : {
                  type: 'file',
                  data: uint8Array,
                  mediaType:file.type
                }
              ]
            }
          ]
        });
        
        response = result.text;
      }

      return NextResponse.json({
        success: true,
        data: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          instructions: instructions,
          response: response.trim()
        }
      });

    } catch (aiError) {
      console.error('AI processing error:', aiError);
      return NextResponse.json(
        { 
          error: 'Failed to process file with AI',
          details: aiError instanceof Error ? aiError.message : 'Unknown AI error'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process upload',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}