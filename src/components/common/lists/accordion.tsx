import { ListAccordionProps } from '@@types/components/commons/lists';
import { TListOptions, TListRenderItem } from '@@types/containers/list';
import {
  Checkbox,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import InputField from '@components/common/forms/input-field';
import { useListCheck, useListInsert } from '@components/common/lists/hooks';
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  cloneElement,
} from 'react';
import { useForm } from 'react-hook-form';
import { FaAngleDown } from 'react-icons/fa';

export default function ListAccordion<
  ItemType extends { id: ItemType['id'] } & Record<string, any>,
  ItemHeaders extends string,
>({
  items,
  renderItem,
  options,
}: ListAccordionProps<ItemType, ItemHeaders>) {
  const tableContainerRef = useRef<HTMLTableElement>(null);
  //const headers = useMemo(() => renderItem.map((_item) => _item.key), []);
  const headers = renderItem.map((_item) => _item.key);
  const { insert, handleInsertClick, closeInsert } = useListInsert();
  const { handleAllCheck, handleCheckChange } = useListCheck<
    ItemType,
    ItemHeaders
  >(items, options?.checkBox);
  const isRenderChild = useMemo(
    () => !!options?.renderChild || !!options?.customRenderChild,
    [],
  );

  const renderHeader = (header: ItemHeaders) => {
    const render = renderItem.find((item) => item.key === header);

    if (!render) return <Th className="table-cell"></Th>;
    const width = render.width && render.width;

    return (
      <Th key={header} w={width ?? 'auto'}>
        {header}
      </Th>
    );
  };
  return (
    <Table
      position="relative"
      className="table-fixed w-full"
      overflow="hidden"
      ref={tableContainerRef}
    >
      {!options?.headerHide && (
        <Thead>
          <Tr>
            {isRenderChild && <Td className="table-cell w-8"></Td>}
            {options?.checkBox && options.checkBox.use && (
              <Td className="table-checkbox table-cell w-8">
                <Checkbox
                  isChecked={
                    items.length === options?.checkBox?.selectItems.length
                  }
                  onChange={handleAllCheck}
                />
              </Td>
            )}
            {headers.map((header, index) => renderHeader(header))}
            {options?.controls && options.controls.length > 0 && (
              <Td className="table-cell"></Td>
            )}
          </Tr>
          {options?.insertRow && (
            <Tr
              position="absolute"
              top="0"
              right="0"
              onClick={() => handleInsertClick(options.insertRow!(closeInsert))}
            >
              <Td>
                <Text>+</Text>
              </Td>
            </Tr>
          )}
        </Thead>
      )}
      <Tbody>
        {options?.insertRow && (
          <>
            {insert && (
              <Tr position="relative">
                {insert}
                <Td position="absolute" top="0" right="0">
                  <span onClick={closeInsert}>-</span>
                </Td>
              </Tr>
            )}
          </>
        )}
        {items.map((item, index) => (
          <AccordionRow
            headers={headers}
            index={index}
            item={item}
            options={options}
            renderItem={renderItem}
            handleCheckChange={handleCheckChange}
            tableSize={tableContainerRef.current?.scrollWidth!}
            isRenderChild={isRenderChild}
            key={`${item.id} - ${index}`}
          />
        ))}
      </Tbody>
    </Table>
  );
}

function AccordionRow<
  ItemType extends { id: ItemType['id'] } & Record<string, any>,
  ItemHeaders extends string,
>({
  headers,
  options,
  item,
  index,
  tableSize,
  renderItem,
  isRenderChild,
  handleCheckChange,
}: {
  headers: ItemHeaders[];
  options?: TListOptions<ItemHeaders, ItemType>;
  renderItem: TListRenderItem<ItemType, ItemHeaders>[];
  item: ItemType;
  index: number;
  isRenderChild: boolean;
  tableSize: number;
  handleCheckChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    item: ItemType,
  ) => void;
}) {
  const [toggle, setToggle] = useState<boolean>(false);

  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: options?.edit?.defaultValues.reduce((prev, key) => {
      prev[key] = item[key];
      return prev;
    }, {} as Record<string, any>),
  });

  const controls = useMemo(() => {
    if (!options) return;
    const _controls = options.controls?.reduce((prev, control, index) => {
      let Component: React.ReactNode =
        typeof control === 'function' ? control(item) : control;

      if (
        !!options?.edit &&
        (Component as React.ReactElement)?.props?.role === 'edit'
      ) {
        Component = React.cloneElement(Component as React.ReactElement, {
          onClick: handleSubmit(options.edit?.onSubmitValid!),
        });
      }
      prev.push(Component);

      if (options!.controls!.length !== index + 1) prev.push(<span> | </span>);
      return prev;
    }, [] as any[]);

    return _controls?.map((control, index) => (
      <span key={index}>{control}</span>
    ));
  }, [options]);

  const renderTableValue = (header: ItemHeaders, item: ItemType) => {
    const render = renderItem.find((item) => item.key === header);

    if (!render) return <Td></Td>;

    const isEdit =
      !!options?.edit &&
      options.edit.editableKeys.find((edit) => edit.key === header);

    return (
      <Td
        key={`${header} - ${item.id}`}
        w={render.width ?? 'auto'}
        {...render.cellStyle}
      >
        {isEdit ? (
          typeof isEdit.Component === 'function' ? (
            isEdit.Component(register, errors)
          ) : (
            <InputField
              label={header}
              hideLabel
              errors={errors}
              errorMessage={
                '' +
                (isEdit.options?.max ||
                  isEdit.options?.min ||
                  isEdit.options?.maxLength ||
                  isEdit.options?.minLength ||
                  '')
              }
            >
              {cloneElement(isEdit.Component, {
                border: '1px solid rgba(125, 125, 125, 0)',
                _hover: {
                  border: '1px solid rgba(125, 125, 125, 0.2)',
                },
                ...register(isEdit.key, isEdit.options || {}),
              })}
            </InputField>
          )
        ) : render.render ? (
          render?.render(item)
        ) : (
          item[header] || ''
        )}
      </Td>
    );
  };

  const renderChildren = (item: ItemType, isExpanded: boolean) => {
    // const isCustom = options?.customRenderChild?.find(
    //   (custom) => custom.key === item.id,
    // );

    // if (isCustom) return isCustom.render(item, index);

    return options?.renderChild ? options?.renderChild(item, isExpanded) : '';
  };

  const renderControls = (item: ItemType) => {
    const _controls = options!.controls!.reduce((prev, control, index) => {
      const Component: React.ReactNode =
        typeof control === 'function' ? control(item) : control;

      prev.push(Component);

      if (options!.controls!.length !== index + 1) prev.push(<span> | </span>);
      return prev;
    }, [] as any[]);

    return _controls?.map((control, index) => (
      <span key={index}>{control}</span>
    ));
  };

  useEffect(() => {
    if (options?.edit) {
      if (!controls)
        throw new Error(
          'The Edit property requires a controls property with at least one role edit.',
        );

      const isEditButton = controls.some(
        (control) =>
          (control as React.ReactElement).props.children.props.role === 'edit',
      );

      if (!isEditButton)
        throw new Error(
          'The Edit property requires a controls property with at least one role edit.',
        );
    }
  }, []);

  const colSpanLength = useMemo(() => {
    const { length } = headers;
    const checkBox = options?.checkBox?.use ? 1 : 0;
    const isControl = options?.controls?.length ? 1 : 0;
    return length + checkBox + isControl + 1;
  }, []);
  const handleToggleClick = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <Tr
        _hover={{
          bg: options?.lineHoverColor ?? 'rgba(248, 243, 200, 0.4)',
        }}
        className="transition-all duration-300"
      >
        {isRenderChild && (
          <Td className="w-8" onClick={handleToggleClick}>
            {!!options?.renderCondition ? (
              options?.renderCondition(item) && (
                <FaAngleDown
                  className={`transition-all duration-300 ${
                    toggle ? 'rotate-180' : ''
                  }`}
                />
              )
            ) : (
              <FaAngleDown
                className={`transition-all duration-300 ${
                  toggle ? 'rotate-180' : ''
                }`}
              />
            )}
          </Td>
        )}
        {options?.checkBox && options.checkBox.use && (
          <Td className="table-checkbox w-8">
            <Checkbox
              isChecked={
                options?.checkBox?.selectItems.findIndex(
                  (_item) => _item.id === item.id,
                ) > -1
              }
              onChange={(e) => handleCheckChange(e, item)}
            />
          </Td>
        )}
        {headers.map((header) => renderTableValue(header, item))}
        {options?.controls && options.controls.length > 0 && (
          <Td>{controls}</Td>
        )}
      </Tr>
      {toggle && (
        <Tr as="div" w="100%">
          <Td as="div" colSpan={colSpanLength} bg="gray.100" w="100%">
            <div
              className="bg-slate-50 w-full"
              style={{
                width: `${tableSize - 4}px`,
              }}
            >
              {renderChildren(item, toggle)}
            </div>
          </Td>
        </Tr>
      )}
    </>
  );
}
