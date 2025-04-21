import React, {
  createContext,
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "@styles/components/details.module.scss";
import { MdKeyboardArrowDown } from "react-icons/md";

type TDetailsContext = {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};
const DetailsContext = createContext<TDetailsContext>({});

const useDetailsContext = () => {
  const context = useContext(DetailsContext);
  if (!context)
    throw new Error("useDetailsContext must be used within a <Details />");
  return context;
};

function DetailsProvider({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const value = useMemo(
    () => ({
      isOpen,
      setIsOpen,
    }),
    [isOpen, setIsOpen],
  );
  return (
    <DetailsContext.Provider value={value}>
      <div className={`${className ?? styles.defaultDetailStyles}`}>
        {children}
      </div>
    </DetailsContext.Provider>
  );
}

function Summary({
  children,
  className,
  isArrow,
  arrowComponent,
}: {
  children: React.ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  isArrow?: boolean;
  arrowComponent?: React.ReactNode;
}) {
  const { setIsOpen } = useDetailsContext();
  return (
    <div
      className={`${styles.summaryContainer} ${
        className ?? styles.defaultSummary
      }`}
      onClick={() => setIsOpen && setIsOpen((prev) => !prev)}
    >
      <div className={styles.summaryContent}>{children}</div>
      {isArrow && (
        <div className={styles.summaryArrow}>{arrowComponent ?? <Arrow />}</div>
      )}
    </div>
  );
}

function Arrow() {
  const { isOpen } = useDetailsContext();
  return (
    <div className={styles.arrowWrapper}>
      <MdKeyboardArrowDown
        className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
      />
    </div>
  );
}

function Content({
  children,
  isLoad = false,
}: {
  children:
    | React.ReactNode
    | (({
        isOpen,
        setIsOpen,
        isLoading,
        setIsLoading,
      }: {
        isOpen: boolean;
        setIsOpen: Dispatch<SetStateAction<boolean>>;
        isLoading: boolean;
        setIsLoading: Dispatch<SetStateAction<boolean>>;
      }) => JSX.Element);
  isLoad?: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const { isOpen, setIsOpen } = useDetailsContext();
  const [contentHeight, setContentHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(isLoad);

  useEffect(() => {
    if (contentRef && !isLoading) {
      setTimeout(() => {
        setContentHeight(isOpen ? contentRef?.current?.scrollHeight ?? 0 : 0);
      }, 0);
    }
  }, [
    contentRef,
    isOpen,
    children,
    contentRef?.current?.scrollHeight,
    isLoading,
  ]);

  return (
    <div className="detail-content-wrapper">
      <div
        className={`detail-content${isOpen ? " open" : ""}`}
        ref={contentRef}
        style={{ height: `${contentHeight}px` }}
      >
        {children instanceof Function
          ? isOpen &&
            setIsOpen &&
            React.createElement(children, {
              isOpen,
              setIsOpen,
              isLoading,
              setIsLoading,
            })
          : children}
      </div>
    </div>
  );
}

const Details = Object.assign(DetailsProvider, {
  Summary,
  Content,
  Arrow,
});

export default Details;
