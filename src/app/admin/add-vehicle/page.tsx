"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";

export default function AddVehiclePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [mainImagePreview, setMainImagePreview] = useState<string>("");

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    brand: "",
    model: "",
    year: new Date().getFullYear().toString(),
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
      const file = files[0];
      setMainImage(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setMainImagePreview(previewUrl);
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
            price: parseFloat(formData.price),
            year: parseInt(formData.year),
            mileage: parseInt(formData.mileage),
            image_main: mainImageUrl,
            image_thumbnail: mainImageUrl,
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
        year: new Date().getFullYear().toString(),
        mileage: "",
        bodyType: "",
        transmission: "",
        exterior_color: "",
        interior_color: "",
        vin: "",
        description: ""
      });
      setMainImage(null);
      setMainImagePreview("");
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

  const carBrands = [
    "Audi", "BMW", "Mercedes-Benz", "Porsche", "Tesla", "Lexus", 
    "Land Rover", "Jaguar", "Bentley", "Ferrari", "Lamborghini", "Rolls-Royce"
  ];

  const bodyTypes = [
    "Sedan", "SUV", "Coupe", "Convertible", "Wagon", "Van"
  ];

  const transmissionTypes = [
    "Automatic", "Manual", "DCT", "CVT"
  ];

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Vehicle</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Images Section */}
            <div className="space-y-4">
              <div>
                <Label>Main Image</Label>
                <div className="mt-2 space-y-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'main')}
                    className="mt-1"
                  />
                  {mainImagePreview && (
                    <div className="relative aspect-video w-full max-w-md">
                      <Image
                        src={mainImagePreview}
                        alt="Main vehicle image preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Additional Images</Label>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageChange(e, 'additional')}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Select 
                  value={formData.brand}
                  onValueChange={(value) => setFormData({ ...formData, brand: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {carBrands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bodyType">Body Type</Label>
                <Select 
                  value={formData.bodyType}
                  onValueChange={(value) => setFormData({ ...formData, bodyType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select body type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bodyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission</Label>
                <Select 
                  value={formData.transmission}
                  onValueChange={(value) => setFormData({ ...formData, transmission: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transmission" />
                  </SelectTrigger>
                  <SelectContent>
                    {transmissionTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="exterior_color">Exterior Color</Label>
                <Input
                  id="exterior_color"
                  value={formData.exterior_color}
                  onChange={(e) => setFormData({ ...formData, exterior_color: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interior_color">Interior Color</Label>
                <Input
                  id="interior_color"
                  value={formData.interior_color}
                  onChange={(e) => setFormData({ ...formData, interior_color: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vin">VIN</Label>
                <Input
                  id="vin"
                  value={formData.vin}
                  onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="h-32"
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Vehicle...
                </>
              ) : (
                'Add Vehicle'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 