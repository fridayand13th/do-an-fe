import React, { useRef, useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";

interface CropComponentProps {
  imageSrc: string;
  onCropComplete: (blob: Blob) => void;
  isOpen: boolean;
  onClose: () => void;
}

const CropComponent: React.FC<CropComponentProps> = ({
  imageSrc,
  onCropComplete,
  isOpen,
  onClose,
}) => {
  const [crop, setCrop] = useState<Crop>();
  const imgRef = useRef<HTMLImageElement>(null);

  const handleCropChange = (newCrop: any) => {
    setCrop(newCrop);
  };

  const handleCropComplete = async () => {
    if (imgRef.current && crop && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("No 2d context");
      }

      ctx.drawImage(
        imgRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          onCropComplete(blob);
        } else {
          console.error("Failed to create blob");
        }
      }, "image/png");
    }
  };

  return (
    <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>이미지 크롭</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ReactCrop crop={crop} ruleOfThirds onChange={handleCropChange}>
            <img src={imageSrc} ref={imgRef} alt="" />
          </ReactCrop>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleCropComplete}>
            저장
          </Button>
          <Button variant="ghost" onClick={onClose} ml={3}>
            취소
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CropComponent;
