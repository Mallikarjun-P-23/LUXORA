import fs from "fs";

let cloudinaryInstance = null;

const getCloudinary = async () => {
  if (!cloudinaryInstance) {
    const { v2 } = await import("cloudinary");
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    cloudinaryInstance = v2;
  }
  return cloudinaryInstance;
};

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    
    console.log('Attempting Cloudinary upload for:', localFilePath);
    const cloudinary = await getCloudinary();
    
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    
    console.log('Cloudinary upload successful:', response.secure_url);
    // Only delete file on successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return response;
  } catch (error) {
    console.error('Cloudinary upload failed:', error.message);
    // Don't delete file on failure - let the calling function handle it
    return null;
  }
};

export { uploadOnCloudinary };