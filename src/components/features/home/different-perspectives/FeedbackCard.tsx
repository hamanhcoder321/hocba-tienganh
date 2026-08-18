import { ShareCardStar } from '@/components/common/icons';
import type { StudentFeedback } from '@/components/features/home/different-perspectives/DifferentPerspectives.astro';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

type FeedbackCardProps = {
  feedbackStudents: StudentFeedback[];
};

export function FeedbackCard({ feedbackStudents }: FeedbackCardProps) {
  return (
    <Carousel>
      <CarouselContent>
        {feedbackStudents.map((item, index) => (
          <CarouselItem
            key={`${item.name}-${item.birthDate}`}
            className="ml-2 basis-1/2 cursor-pointer select-none py-2 pl-0 first:ml-4 2xl:basis-[38%]"
          >
            <div className="my-1 h-[191px] w-full rounded-xl bg-white p-4 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.06)] sm:h-[300px] sm:p-6 3xl:h-[350px] 3xl:p-8">
              <div className="relative flex h-full w-full flex-col justify-between">
                <div className="mt-2 flex h-[11px] w-fit sm:mt-0 sm:h-[22px]">
                  <ShareCardStar />
                  <ShareCardStar />
                  <ShareCardStar />
                  <ShareCardStar />
                  <ShareCardStar />
                </div>
                <div className="">
                  <p className="line-clamp-5 text-xs font-medium italic leading-[16.05px] text-[#504E4E] sm:text-base 3xl:text-[18px] 3xl:leading-[30px]">
                    {item.content}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="h-[32px] w-[32px] overflow-hidden rounded-full sm:h-[40px] sm:w-[40px] 3xl:h-[60px] 3xl:w-[60px]">
                    <img
                      width={40}
                      height={60}
                      sizes="(max-width: 768px) 20px, 40px"
                      className="h-auto w-[60px]"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="flex-1 overflow-hidden p-2">
                    <p className="text-nowrap text-[10px] font-semibold leading-[13.49px] text-[#17012C] sm:text-base 3xl:text-[20px] 3xl:leading-[25px]">
                      {item.name}
                    </p>
                    <p className="text-[8.56px] font-normal text-[#504E4E] sm:text-[14px] 3xl:text-[16px]">
                      {item.birthDate}
                    </p>
                  </div>
                </div>
                <div className="absolute right-0 top-0 w-[24px] sm:w-[45px]">
                  <svg
                    className="h-full w-full"
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.3">
                      <path
                        d="M21.5998 15.1662C21.4359 21.2706 20.2326 27.1028 17.1618 32.4687C15.0391 36.1766 11.8636 38.7708 8.31789 40.9881C8.09312 41.1284 7.80413 41.3886 7.55907 41.1588C7.2836 40.9002 7.52189 40.5673 7.66216 40.3087C8.9449 37.9646 10.3121 35.6645 11.4292 33.2309C12.6528 30.564 13.6212 27.811 14.2567 24.9396C14.4257 24.1774 14.255 24.0929 13.535 24.2484C7.64188 25.526 2.16112 21.8976 1.00852 15.9858C-0.0849304 10.38 3.84608 4.78603 9.51275 3.88694C15.9196 2.86954 21.5491 7.65063 21.5998 14.1522C21.6015 14.4902 21.5998 14.8282 21.5998 15.1662Z"
                        fill="#635AD9"
                      />
                      <path
                        d="M44.25 15.2202C44.0793 21.5916 42.7949 27.6571 39.3912 33.1581C37.3175 36.5077 34.3228 38.8501 31.0746 40.9288C30.816 41.0945 30.4729 41.4375 30.1856 41.1198C29.9253 40.8325 30.2346 40.4877 30.3884 40.1987C31.6559 37.8462 33.0401 35.5562 34.1403 33.1142C35.3351 30.4642 36.2917 27.7382 36.9153 24.8939C37.0775 24.1536 36.8967 24.0827 36.2224 24.2415C30.2836 25.6358 24.4277 21.6338 23.5556 15.4348C22.7985 10.0537 26.7751 4.68115 32.1359 3.89022C38.7118 2.92353 44.2162 7.65053 44.25 14.2923C44.25 14.6016 44.25 14.9109 44.25 15.2202Z"
                        fill="#635AD9"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
