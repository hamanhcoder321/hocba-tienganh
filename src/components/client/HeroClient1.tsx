import Phan1MucNho from '../server/Phan1MucNho';

const HeroClient1 = () => {
  const handleScrollToForm = () => {
    const element = document.getElementById('form-register-time');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleOpenAdvise = () => {
    document.getElementById('prime')?.click();
  };

  return (
    <>
      <div onClick={handleOpenAdvise}>
        <Phan1MucNho str={'CHAT CÙNG CỐ VẤN HỌC TẬP'} numb={'02'} />
      </div>
      <div onClick={handleScrollToForm} className="h-fit w-fit">
        <Phan1MucNho str={'THAM KHẢO CHƯƠNG TRÌNH HỌC'} numb={'03'} />
      </div>
    </>
  );
};
export default HeroClient1;
