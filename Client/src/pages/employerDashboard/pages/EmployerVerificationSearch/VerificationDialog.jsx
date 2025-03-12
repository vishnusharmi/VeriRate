import { useState } from "react";
import { toast } from "react-toastify";

// ENUM Definition
const VerificationStatus = {
  VERIFIED: "Verified",
  PENDING: "Pending",
};

const VerificationDialog = ({ isOpen, onClose, employment, onVerify }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !employment) return null;

  const handleVerify = async () => {
    setIsSubmitting(true);
    try {
      const result = await onVerify(employment);
      if (result) {
        onClose();
      }
    } catch (error) {
      console.log("Verification failed:", error);
      toast.error("Failed to verify employee. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,50%)] h-screen flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Verify Employment</h2>
        <div className="space-y-4">
          <div>
            <strong>Name:</strong> {employment.name}
          </div>
          <div>
            <strong>Company:</strong> {employment.company_name}
          </div>
          <div>
            <strong>Position:</strong> {employment.position}
          </div>
          <div>
            <strong>Email:</strong> {employment.email}
          </div>
          <div>
            <strong>Verification Status:</strong>
            {employment.is_verified === VerificationStatus.VERIFIED ? (
              <span className="text-green-600"> Verified</span>
            ) : (
              <span className="text-yellow-600"> Pending</span>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          {employment.is_verified !== VerificationStatus.VERIFIED && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleVerify}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationDialog;
