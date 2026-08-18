import { FilledTriangle, MucNhoNganCach } from '@/components/common/icons';

interface Phan1MucNhoProps {
  str: string;
  numb: string;
}
const Phan1MucNho: React.FC<Phan1MucNhoProps> = ({ str, numb }) => {
  return (
    <div className="mb-3 flex h-10 min-w-[300px] cursor-pointer items-center bg-[#AF0000] px-2 sm:h-auto sm:w-auto sm:px-4 sm:py-2 xl:w-[460px] 3xl:w-[560px]">
      <div className="mr-2 flex items-center gap-2 sm:mr-0 sm:w-[42px] sm:gap-3 3xl:w-[42px]">
        <FilledTriangle className="size-4 sm:size-6" />
        <MucNhoNganCach className="h-5 sm:h-8" />
      </div>
      <div className="flex flex-1 items-center gap-2 sm:gap-4 sm:px-4">
        <div className="w-full flex-1 text-nowrap text-[12.46px] font-bold uppercase leading-[13.08px] text-white sm:text-lg 3xl:text-[24px] 3xl:leading-[25.2px]">
          {str}
        </div>
      </div>
      <div className="flex-shrink-0 bg-gradient-to-r from-[#FFDE90] to-[#C1272D] bg-clip-text text-[24.92px] font-[800] leading-[26.16px] text-transparent sm:text-[36px] sm:leading-[50.4px] 3xl:text-[48px]">
        {numb}
      </div>
    </div>
  );
};

export default Phan1MucNho;
