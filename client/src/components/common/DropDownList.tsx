type DropDownListProps = {
  value: string;
  setTab: any;
  setIsOpen: any;
  isOpen: boolean;
};

export default function DropDownList({
  value,
  setTab,
  setIsOpen,
  isOpen,
}: DropDownListProps) {
  const handleOnClick = () => {
    setTab(value);
    setIsOpen(!isOpen);
  };

  return <li onClick={handleOnClick}>{value}</li>;
}
