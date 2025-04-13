import { Button, Box } from '@chakra-ui/react';
import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useMemo,
  Dispatch,
  SetStateAction,
  RefObject,
} from 'react';
import { FaAngleDown } from 'react-icons/fa';
import styles from '@styles/components/content-box.module.scss';

type ContentBoxProps = {
  headerRender?: React.ReactNode;
  children?: React.ReactNode;
  containerStyle?: React.CSSProperties;
  boxRole?: 'none' | 'accordion';
  defaultOpen?: boolean;
  height?: string;
};

type TContentBoxContext = {
  isAccordion: boolean;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>> | null;
  size: number;
  setSize: Dispatch<SetStateAction<number>> | null;
  contentRef: RefObject<HTMLDivElement> | null;
  defaultOpen: boolean;
};

const ContentBoxContext = createContext<TContentBoxContext>({
  isAccordion: false,
  open: true,
  setOpen: null,
  size: 0,
  setSize: null,
  contentRef: null,
  defaultOpen: false,
});
const useContentBoxContext = () => {
  const context = useContext(ContentBoxContext);
  if (context === undefined) {
    throw new Error(
      'useContentBoxContext must be used within a <ContentBox />',
    );
  }

  return context;
};
function ContentBoxProvider({
  children,
  headerRender,
  containerStyle,
  boxRole = 'none',
  defaultOpen = false,
}: ContentBoxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [size, setSize] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const value = useMemo(
    () => ({
      isAccordion: boxRole === 'accordion',
      open,
      setOpen,
      size,
      setSize,
      contentRef,
      defaultOpen,
    }),
    [open, setOpen],
  );
  return (
    <ContentBoxContext.Provider value={value}>
      <ContentBoxMain
        headerRender={headerRender}
        containerStyle={containerStyle}
      >
        {children}
      </ContentBoxMain>
    </ContentBoxContext.Provider>
  );
}

function ContentBoxHeader({
  headerBorder = true,
  children,
}: {
  headerBorder?: boolean;
  children: React.ReactNode;
}) {
  const { isAccordion, setOpen } = useContentBoxContext();
  const _style = !headerBorder && { borderBottom: 'none' };
  return (
    <div className={styles.contentBoxHeader} style={{ ..._style }}>
      {isAccordion ? (
        <>
          <Button
            justifyContent="start"
            width="100%"
            cursor="pointer"
            size="sm"
            onClick={() => setOpen && setOpen((prev) => !prev)}
          >
            {children}
          </Button>
          <FaAngleDown className={styles.arrow} />
        </>
      ) : (
        children
      )}
    </div>
  );
}

function ContentBoxBody({ children }: { children: React.ReactNode }) {
  const { isAccordion, setSize, contentRef, size, open, defaultOpen, setOpen } =
    useContentBoxContext();
  useEffect(() => {
    if (contentRef?.current && isAccordion) {
      if (setSize && setOpen) {
        setSize(() => (contentRef.current! as HTMLElement).scrollHeight);

        if (defaultOpen) {
          setOpen(() => true);
        }
      }
    }
  }, [contentRef?.current, children]);
  return (
    <div
      className={styles.contentBoxBody}
      ref={contentRef}
      style={
        isAccordion
          ? {
              height: open ? `${size}px` : 0,
              overflow: size > 1000 ? 'auto' : 'none',
            }
          : {}
      }
    >
      {children}
    </div>
  );
}
function ContentBoxMain({
  children,
  headerRender,
  containerStyle,
  height,
}: ContentBoxProps) {
  const { open, setSize, contentRef, isAccordion } = useContentBoxContext();
  const isHeader = !!headerRender;

  return (
    <Box
      overflowX="auto"
      className={`${
        isAccordion ? styles.accordion : styles.contentBoxContainer
      }${open ? ' ' + styles.open : ''}`}
      height={height}
    >
      <Box className={styles.contentBoxWrapper} height={height}>
        {isHeader && <ContentBoxHeader>{headerRender}</ContentBoxHeader>}
        {children}
      </Box>
    </Box>
  );
}
function ContentBoxFooter({
  children,
  loc = 'start',
}: {
  children: React.ReactNode;
  loc?: 'start' | 'end';
}) {
  return <div className={`${styles.contentBoxFooter} ${loc}`}>{children}</div>;
}

const ContentBox = Object.assign(ContentBoxProvider, {
  Header: ContentBoxHeader,
  Body: ContentBoxBody,
  Footer: ContentBoxFooter,
});

export default ContentBox;
