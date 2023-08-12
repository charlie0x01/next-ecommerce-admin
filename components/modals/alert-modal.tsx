"use client";

import { useEffect, useState } from "react";
// local imports
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title: string;
  description: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
        <div className="flex items-center space-x-2 pt-6 justify-end w-full">
            <Button disabled={loading} variant="outline" onClick={onClose} >
                Cancel
            </Button>
            <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                Continue
            </Button>
        </div>
    </Modal>
  );
};
