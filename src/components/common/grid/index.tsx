import {
  Grid as ChakraGrid,
  GridItem,
  GridItemProps,
  GridProps,
} from '@chakra-ui/react';
import React, {
  Children,
  createContext,
  DragEvent,
  MouseEvent,
  useContext,
  useMemo,
  useState,
} from 'react';
import styles from '@styles/components/grid-list.module.scss';

type TGridContext = {
  area?: string[];
  areaHeader?: string[];
  gridTemplateColumns: string;
  top?: string;
};
type TGridProviderProps<T> = {
  children: React.ReactNode;
  area: T[][];
  gridTemplateColumns: string;
  fixHeaderKey?: string[];
  fixedColumnLength?: number;
  storeColumnKey?: string;
  isAutoHeaderRender?: boolean;
  top?: string;
} & GridProps;
const GridContext = createContext<TGridContext>({
  area: [''],
  gridTemplateColumns: '',
  top: '',
});

const useGridContext = () => {
  const context = useContext(GridContext);
  if (!context)
    throw new Error('useGridContext must be used within a <Grid />');
  return context;
};

function GridProvider<T extends string>({
  children,
  area,
  gridTemplateColumns,
  fixHeaderKey,
  fixedColumnLength,
  storeColumnKey,
  isAutoHeaderRender = true,
  ...props
}: TGridProviderProps<T>) {
  const [gridArea, gridAreaHeaders] = useMemo(() => {
    return area.reduce(
      (prev, areas) => {
        prev[0].push(areas.join(' '));
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
  }, [area]);

  const value = useMemo(
    () => ({
      area: gridArea,
      areaHeader: gridAreaHeaders,
      gridTemplateColumns: gridTemplateColumns,
      top: props.top,
    }),
    [gridTemplateColumns, props.top],
  );

  const renderHeader = (headers: string[], isFixed = false) =>
    headers.map((_area, index) => (
      <Item
        key={_area + index}
        area={_area}
        className={`${isFixed ? '' : 'relative'}`}
      >
        <span className="truncate">{_area}</span>
      </Item>
    ));

  return (
    <GridContext.Provider value={value}>
      <div className="overflow-auto" {...(props as any)}>
        {isAutoHeaderRender && (
          <GridHeader display="inline-grid">
            {renderHeader(gridAreaHeaders)}
          </GridHeader>
        )}
        <div className={styles.gridChildrenContainer}>{children}</div>
      </div>
    </GridContext.Provider>
  );
}

function GridWrapper({
  children,
  ...props
}: { children: React.ReactNode } & GridProps) {
  const { area: gridArea, gridTemplateColumns } = useGridContext();
  return (
    <ChakraGrid
      {...props}
      display="inline-grid"
      className={`grid-row ${props.className ?? ''}`}
      gridTemplateAreas={`${gridArea?.map((area) => `'${area}'`).join(' ')}`}
      gridTemplateColumns={gridTemplateColumns}
    >
      {children}
    </ChakraGrid>
  );
}

function GridHeader({
  children,
  ...props
}: { children: React.ReactNode } & GridProps) {
  const { area: gridArea, gridTemplateColumns, top } = useGridContext();

  return (
    <ChakraGrid
      {...props}
      className={`header-row ${props.className ?? ''}`}
      top={top}
      gridTemplateAreas={`${gridArea?.map((area) => `'${area}'`).join(' ')}`}
      gridTemplateColumns={gridTemplateColumns}
    >
      {children}
    </ChakraGrid>
  );
}

function Item<T>({ area, ...props }: { area: T } & GridItemProps) {
  return (
    <GridItem
      {...props}
      className={`grid-item ${props.className ?? ''}`}
      area={area}
    >
      {props.children}
    </GridItem>
  );
}

const Grid = Object.assign(GridProvider, {
  Wrapper: GridWrapper,
  Header: GridHeader,
  Item,
});

export default Grid;
