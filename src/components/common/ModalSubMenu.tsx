type ModalSubMenuProps = {
  children: React.ReactNode;
  dataCategories?: React.ReactNode;
  onMouseEnter?: () => void;
};

const ModalSubMenu = ({ children, dataCategories, onMouseEnter }: ModalSubMenuProps) => {
  return (
    <div className="absolute left-0 top-[50px] !z-[-1] hidden h-screen w-screen overflow-hidden border-b group-hover:block">
      <div className="bg-[#F3F3F3]">
        <div className="xl:w-wrapSmall 3xl:w-wrapBox container grid w-full grid-cols-7 gap-4 px-10 py-10 pt-14 lg:mx-auto xl:px-0 xl:pt-20 3xl:pt-[100px]">
          {dataCategories && <div className="col-span-2 flex h-full flex-col gap-2">{dataCategories}</div>}
          <div className="col-span-5 flex flex-wrap gap-6 xl:gap-10 3xl:gap-20">{children}</div>
        </div>
      </div>
      <div onMouseEnter={onMouseEnter} className="bg-bgModal h-full overflow-hidden"></div>
    </div>
  );
};

export default ModalSubMenu;
