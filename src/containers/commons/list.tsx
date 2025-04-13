import { TListProps } from "@@types/containers/list";
import ListAccordion from "@components/common/lists/accordion";

const LIST_COMPONENT = {
  accordion: ListAccordion,
};

export default function List<
  ItemType extends { id: ItemType["id"] } & Record<string, any>,
  ItemHeaders extends string,
>({
  items,
  options,
  renderItem,
  headerKey,
}: TListProps<ItemType, ItemHeaders>) {
  return (
    <ListAccordion
      items={items}
      renderItem={renderItem}
      headerKey={headerKey}
      options={options}
    />
  );
}
