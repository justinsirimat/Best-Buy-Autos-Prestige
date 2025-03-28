"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ImageUpload } from "@/components/ui/image-upload";

export default function AddVehiclePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    bodyType: "",
    transmission: "",
    exterior_color: "",
    interior_color: "",
    vin: "",
    description: ""
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'additional') => {
    const files = e.target.files;
    if (!files) return;

    if (type === 'main') {
      setMainImage(files[0]);
    } else {
      setAdditionalImages(Array.from(files));
    }
  };

  const uploadImage = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('vehicle-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('vehicle-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload main image
      let mainImageUrl = '';
      if (mainImage) {
        mainImageUrl = await uploadImage(mainImage, 'main');
      }

      // Insert vehicle data
      const { data: vehicle, error: vehicleError } = await supabase
        .from('vehicles')
        .insert([
          {
            ...formData,
            image_main: mainImageUrl,
            image_thumbnail: mainImageUrl, // Using same image for thumbnail
          }
        ])
        .select()
        .single();

      if (vehicleError) throw vehicleError;

      // Upload additional images
      if (additionalImages.length > 0 && vehicle) {
        const imagePromises = additionalImages.map(async (file, index) => {
          const imageUrl = await uploadImage(file, 'additional');
          return supabase
            .from('vehicle_images')
            .insert([
              {
                vehicle_id: vehicle.id,
                url: imageUrl,
                alt_text: `${vehicle.title} - Image ${index + 1}`,
                sort_order: index
              }
            ]);
        });

        await Promise.all(imagePromises);
      }

      toast({
        title: "Success!",
        description: "Vehicle added successfully.",
      });

      // Reset form
      setFormData({
        title: "",
        price: "",
        brand: "",
        model: "",
        year: "",
        mileage: "",
        bodyType: "",
        transmission: "",
        exterior_color: "",
        interior_color: "",
        vin: "",
        description: ""
      });
      setMainImage(null);
      setAdditionalImages([]);

    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to add vehicle. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Add New Vehicle</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <Label htmlFor="mainImage">Main Image</Label>
            <Input
              id="mainImage"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'main')}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="additionalImages">Additional Images</Label>
            <Input
              id="additionalImages"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImageChange(e, 'additional')}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Add other form fields here */}
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="h-32"
            />
          </div>
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Vehicle"}
        </Button>
      </form>
    </div>
  );
} 