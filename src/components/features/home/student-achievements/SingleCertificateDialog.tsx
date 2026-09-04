import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const SingleCertificateDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeStudent, setActiveStudent] = useState<any>(null);

  useEffect(() => {
    const handleOpenDialog = (e: any) => {
      if (e.detail && e.detail.student) {
        setActiveStudent(e.detail.student);
        setIsDialogOpen(true);
      }
    };
    window.addEventListener('openSingleCertificateDialog', handleOpenDialog);
    return () => window.removeEventListener('openSingleCertificateDialog', handleOpenDialog);
  }, []);

  if (!activeStudent) return null;

  // Extract avatar URL handling
  const avatarUrl = typeof activeStudent.image === 'string' 
    ? activeStudent.image 
    : (activeStudent.image?.src || '');

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent
        hideClose
        className="w-[90vw] max-w-[400px] h-[80vh] max-h-[550px] overflow-hidden rounded-[24px] bg-[#EBF5FF] p-4 border-none shadow-2xl flex flex-col md:max-w-[450px] md:max-h-[600px] md:p-6"
      >
        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-4 z-50 flex size-[30px] rounded-full bg-white border border-gray-200 p-0 hover:bg-gray-100 shadow-md md:size-10"
          onClick={() => setIsDialogOpen(false)}
        >
          <X className="!size-4 md:!size-6 text-black" strokeWidth={2.3} />
        </Button>
        
        <div className="w-full h-full relative flex items-center justify-center bg-[#D9D9D9]/50 rounded-[16px] border border-gray-200 shadow-inner overflow-hidden">
          {activeStudent.certificate ? (
            <img 
              src={activeStudent.certificate} 
              alt={`Chứng chỉ của ${activeStudent.name}`} 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
              <span className="font-gilroy text-lg md:text-2xl font-bold uppercase tracking-wider text-gray-400">Chưa có dữ liệu chứng chỉ</span>
            </div>
          )}
        </div>

        {/* Floating Pill Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[480px] bg-black/60 backdrop-blur-md rounded-[50px] p-2 flex items-center shadow-2xl">
          {/* Avatar */}
          <div className="shrink-0 rounded-full w-[60px] h-[60px] md:w-[70px] md:h-[70px] overflow-hidden border-2 border-white/20 bg-gray-200 relative">
            {avatarUrl && (
              <img src={avatarUrl} alt={activeStudent.name} className="w-full h-full object-cover" />
            )}
          </div>
          
          {/* Name and breakdown */}
          <div className="flex-1 px-4 flex flex-col justify-center">
            <h3 className="text-white font-gilroy font-bold uppercase text-[15px] md:text-[18px] leading-tight line-clamp-1">{activeStudent.name}</h3>
            {/* Mocked breakdown - CMS does not provide this yet */}
            <p className="text-[#FFCF5A] font-gilroy text-[12px] md:text-[14px] font-semibold mt-0.5 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M26 0C19.1044 0 12.4912 2.73928 7.61522 7.61522C2.73928 12.4912 0 19.1044 0 26C0 32.8956 2.73928 39.5088 7.61522 44.3848C12.4912 49.2607 19.1044 52 26 52C32.8956 52 39.5088 49.2607 44.3848 44.3848C49.2607 39.5088 52 32.8956 52 26C52 19.1044 49.2607 12.4912 44.3848 7.61522C39.5088 2.73928 32.8956 0 26 0ZM6.5 26C6.5 23.4392 7.00438 20.9035 7.98435 18.5377C8.96432 16.1718 10.4007 14.0222 12.2114 12.2114C14.0222 10.4007 16.1718 8.96432 18.5377 7.98435C20.9035 7.00438 23.4392 6.5 26 6.5C28.5608 6.5 31.0965 7.00438 33.4623 7.98435C35.8282 8.96432 37.9778 10.4007 39.7886 12.2114C41.5993 14.0222 43.0357 16.1718 44.0156 18.5377C44.9956 20.9035 45.5 23.4392 45.5 26C45.5 31.1717 43.4455 36.1316 39.7886 39.7886C36.1316 43.4455 31.1717 45.5 26 45.5C20.8283 45.5 15.8684 43.4455 12.2114 39.7886C8.55446 36.1316 6.5 31.1717 6.5 26Z" fill="#FFCF5A"/>
              </svg>
              Lis: 8.0, Read: 8.5
            </p>
          </div>

          {/* Score */}
          <div className="pr-5 shrink-0 flex items-center justify-end border-l border-white/20 pl-4 py-2">
            <span className="text-white font-gilroy font-black text-[22px] md:text-[28px]">{activeStudent.badge || 'IELTS'}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
