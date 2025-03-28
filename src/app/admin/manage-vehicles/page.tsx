"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";

export default function ManageVehiclesPage() {
  const { toast } = useToast();
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast({
        title: "Error",
        description: "Failed to load vehicles",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (vehicleId: string, file: File, type: 'main' | 'additional') => {
    setUploading(prev => ({ ...prev, [vehicleId]: true }));

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${vehicleId}-${Math.random()}.${fileExt}`;
      const filePath = `${type}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('vehicle-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('vehicle-images')
        .getPublicUrl(filePath);

      if (type === 'main') {
        await supabase
          .from('vehicles')
          .update({ 
            image_main: publicUrl,
            image_thumbnail: publicUrl 
          })
          .eq('id', vehicleId);
      } else {
        await supabase
          .from('vehicle_images')
          .insert([{
            vehicle_id: vehicleId,
            url: publicUrl,
            alt_text: `${vehicles.find(v => v.id === vehicleId)?.title} - Additional Image`,
            sort_order: 0
          }]);
      }

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      fetchVehicles();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(prev => ({ ...prev, [vehicleId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Vehicles</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden">
            <CardHeader>
              <h3 className="font-semibold">{vehicle.title}</h3>
              <p className="text-sm text-muted-foreground">${vehicle.price}</p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">Main Image</p>
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                    {vehicle.image_main ? (
                      <Image
                        src={vehicle.image_main}
                        alt={vehicle.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-sm text-muted-foreground">No image</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(vehicle.id, file, 'main');
                      }}
                      disabled={uploading[vehicle.id]}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Additional Images</p>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      files.forEach(file => handleImageUpload(vehicle.id, file, 'additional'));
                    }}
                    disabled={uploading[vehicle.id]}
                  />
                </div>

                {uploading[vehicle.id] && (
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span className="text-sm">Uploading...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 