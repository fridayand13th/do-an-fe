import { TGridListProps } from "@@types/containers/list";
import {
  Button,
  Checkbox,
  Grid,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { cloneElement, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "@styles/components/grid-list.module.scss";
import InputField from "@components/common/forms/input-field";
import mediaQuery from "@constants/media-query";
import { FaAngleDown, FaEdit } from "react-icons/fa";
import { useListCheck } from "@components/common/lists/hooks";

export default function ListGrid<
  T extends { id: T["id"] } & Record<string, any>,
  K extends string,
>({
  type = "card",
  headerKey,
  items,
  listGridProps,
  itemGridTemplate,
  tabletGridTemplate,
  mobileGridTemplate,
  templateColumns,
  mobileTemplateColumns,
  tabletTemplateColumns,
  itemGridProps,
  listGridItemProps,
  itemGridItemProps,
  customRenderItems,
  itemStyles,
  options,
  emptyMessage,
}: TGridListProps<T, K>) {
  const [isLargerThanMobile] = useMediaQuery(
    `(min-width: ${mediaQuery.tablet})`,
    { fallback: true },
  );
  const [isLargerThanTablet] = useMediaQuery(`(min-width: ${mediaQuery.pc})`, {
    fallback: true,
  });
  const listCheck =
    !!options?.checkBox && useListCheck<T, K>(items, options?.checkBox);

  const [gridArea, gridAreaHeaders] = useMemo(() => {
    const _itemGridTemplate = isLargerThanTablet
      ? itemGridTemplate
      : isLargerThanMobile
      ? tabletGridTemplate || itemGridTemplate
      : mobileGridTemplate || itemGridTemplate;
    return _itemGridTemplate.reduce(
      (prev, areas) => {
        prev[0].push(areas.join(" "));
        areas.forEach((area) => {
          if (area) {
            const areaList = prev[1];
            const isExist = areaList.includes(area);

            if (!isExist) prev[1].push(area);
          }
        });

        return prev;
      },
      [[], []] as [string[], string[]],
    );
  }, [isLargerThanMobile, isLargerThanTablet, items]);

  const _templateColumns = useMemo(() => {
    const defaultColumns = `repeat(${gridArea[0].split(" ").length}, 1fr)`;
    return isLargerThanTablet
      ? templateColumns || defaultColumns
      : isLargerThanMobile
      ? tabletTemplateColumns || defaultColumns
      : mobileTemplateColumns || defaultColumns;
  }, [isLargerThanMobile, isLargerThanTablet]);

  return (
    <Grid
      {...listGridProps}
      templateColumns={listGridProps?.templateColumns || "auto"}
      templateRows={listGridProps?.templateRows || "auto"}
      className={`${type === "table" ? styles.gridTable : styles.gridCard} ${
        listGridProps?.templateColumns || ""
      } ${listGridProps?.templateRows || ""} overflow-x-auto`}
    >
      <GridItem className={styles.gridContainer} {...listGridItemProps}>
        <Grid
          h="100%"
          placeItems="center"
          position="relative"
          templateColumns={_templateColumns}
          {...itemGridProps}
          gridTemplateAreas={`${gridArea.map((area) => `'${area}'`).join(" ")}`}
          className={`${styles.gridHeader}`}
        >
          {gridAreaHeaders.map((area) => {
            return (
              <GridItem
                key={`${area}`}
                area={`${area}`}
                {...itemGridItemProps}
                className={`${styles.gridItem}`}
              >
                area
              </GridItem>
            );
          })}
          {!!options?.checkBox && listCheck && (
            <div className={styles.gridCheckboxContainer}>
              <div className={styles.gridCheckboxWrapper}>
                <Checkbox
                  isChecked={
                    items?.length === options.checkBox.selectItems.length
                  }
                  onChange={listCheck.handleAllCheck}
                />
              </div>
            </div>
          )}
        </Grid>
      </GridItem>
      {items?.length > 0 ? (
        items.map((item, index) => (
          <GridListRow
            key={index}
            item={item}
            gridArea={gridArea}
            gridAreaHeaders={gridAreaHeaders}
            itemGridProps={itemGridProps}
            itemGridItemProps={itemGridItemProps}
            customRenderItems={customRenderItems}
            itemGridTemplate={itemGridTemplate}
            templateColumns={_templateColumns}
            listCheck={listCheck}
            itemStyles={itemStyles}
            options={options}
            itemIndex={index}
          />
        ))
      ) : emptyMessage ? (
        <p className="w-full text-center">{emptyMessage}</p>
      ) : (
        <></>
      )}
    </Grid>
  );
}

function GridListRow<
  T extends { id: T["id"] } & Record<string, any>,
  K extends string,
>({
  item,
  gridArea,
  gridAreaHeaders,
  itemGridProps,
  listGridItemProps,
  itemGridItemProps,
  customRenderItems,
  templateColumns,
  options,
  itemStyles,
  listCheck,
  itemIndex,
}: Omit<TGridListProps<T, K>, "items" | "type" | "headers"> & {
  item: T;
  gridArea: string[];
  gridAreaHeaders: string[];
  itemIndex: number;
  listCheck:
    | false
    | {
        handleCheckChange: (
          e: React.ChangeEvent<HTMLInputElement>,
          item: T,
        ) => void;
        handleAllCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
      };
}) {
  const [childToggle, setChildToggle] = useState<boolean>(false);
  const form = options?.edit
    ? useForm({
        mode: "onSubmit",
        defaultValues: options?.edit?.defaultValues.reduce((prev, key) => {
          prev[key] = item[key];
          return prev;
        }, {} as Record<string, any>),
      })
    : null;

  const renderItem = (item: T, area: string, index: number) => {
    const isEdit =
      !!options?.edit &&
      options.edit.editableKeys.find((edit) => edit.key === area);

    if (!customRenderItems) return item[area] || "";

    const customRenderItem = customRenderItems.find(
      (renderItem) => renderItem.key === area,
    );

    return (
      <>
        {isEdit && form ? (
          typeof isEdit.Component === "function" ? (
            isEdit.Component(form.register, form.formState.errors)
          ) : (
            <InputField
              label={area}
              hideLabel
              errors={form.formState.errors}
              errorMessage={
                "" +
                (isEdit.options?.max ||
                  isEdit.options?.min ||
                  isEdit.options?.maxLength ||
                  isEdit.options?.minLength ||
                  "")
              }
            >
              {cloneElement(isEdit.Component, {
                border: "1px solid rgba(125, 125, 125, 0)",
                size: "sm",
                _hover: {
                  border: "1px solid rgba(125, 125, 125, 0.2)",
                },
                textAlign: "center",
                ...form.register(isEdit.key, isEdit.options || {}),
              })}
            </InputField>
          )
        ) : customRenderItem ? (
          customRenderItem.render(item, index)
        ) : (
          item[area] || ""
        )}
      </>
    );
  };

  useEffect(() => {
    if (form) {
      const values = form.getValues();
      Object.entries(values).forEach(([key, value]) => {
        if (value !== item[key]) form.setValue(key, item[key]);
      });
    }
  }, [item]);

  return (
    <>
      <GridItem
        key={item.id as string | number}
        className={`${styles.gridContainer} ${
          childToggle ? styles.active : ""
        }`}
        {...listGridItemProps}
      >
        {options?.renderChild && (
          <div
            className={styles.arrow}
            onClick={() => setChildToggle((prev) => !prev)}
          >
            <FaAngleDown
              className={`transition-all duration-300 ${
                childToggle ? "rotate-180" : ""
              }`}
            />
          </div>
        )}
        <Grid
          h="100%"
          placeItems="center"
          placeContent="center"
          templateColumns={templateColumns}
          position="relative"
          {...itemGridProps}
          gridTemplateAreas={`${gridArea.map((area) => `'${area}'`).join(" ")}`}
        >
          {gridAreaHeaders.map((area) => {
            let _itemStyles = {};
            if (itemStyles) {
              _itemStyles = itemStyles[area] || {};
            }
            return (
              <GridItem
                key={`${item.id}-${area}`}
                area={`${area}`}
                {..._itemStyles}
                className={`${styles.gridItem}`}
                {...itemGridItemProps}
              >
                {renderItem(item, area, itemIndex)}
              </GridItem>
            );
          })}
          {!!options?.checkBox && listCheck && (
            <div className={styles.gridCheckboxContainer}>
              <div className={styles.gridCheckboxWrapper}>
                <Checkbox
                  position="absolute"
                  top="50%"
                  transform="translateY(-50%)"
                  isChecked={
                    options?.checkBox.selectItems.findIndex(
                      (_item) => _item.id === item.id,
                    ) > -1
                  }
                  onChange={(e) => listCheck.handleCheckChange(e, item)}
                />
              </div>
            </div>
          )}
          {options?.edit && form && (
            <GridItem area="controls">
              <Button
                display="flex"
                border="none"
                p="0"
                bg="none"
                role="edit"
                alignItems="center"
                className="list-edit-button"
                isLoading={
                  options.edit.fetchingId
                    ? item[options.edit.fetchingTargetName || "id"] ===
                      options.edit.fetchingId
                    : false
                }
                onClick={form.handleSubmit(options.edit!.onSubmitValid)}
              >
                <FaEdit />
              </Button>
            </GridItem>
          )}
        </Grid>
      </GridItem>
      {options?.renderChild &&
        childToggle &&
        options.renderChild(item, childToggle)}
    </>
  );
}
