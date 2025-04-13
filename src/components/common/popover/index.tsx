import {
  Popover as ChakraPopover,
  PopoverAnchor,
  PopoverArrow,
  PopoverBody,
  PopoverBodyProps,
  PopoverCloseButton,
  PopoverContent,
  PopoverContentProps,
  PopoverFooter,
  PopoverFooterProps,
  PopoverHeader,
  PopoverHeaderProps,
  PopoverProps,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';

export default function Popover({
  trigger,
  header,
  footer,
  popoverProps,
  popoverContentProps,
  popoverHeaderProps,
  popoverFooterProps,
  popoverBodyProps,
  children,
  isControl,
}: {
  trigger: React.ReactNode | string;
  header?: React.ReactNode | string;
  footer?: React.ReactNode | string;
  popoverProps?: PopoverProps;
  popoverContentProps?: PopoverContentProps;
  popoverHeaderProps?: PopoverHeaderProps;
  popoverFooterProps?: PopoverFooterProps;
  popoverBodyProps?: PopoverBodyProps;
  children: React.ReactNode;
  isControl?: boolean;
}) {
  if (isControl)
    return (
      <ChakraPopover {...popoverProps}>
        {({ isOpen }: { isOpen: boolean }) => (
          <>
            <PopoverTrigger>{trigger}</PopoverTrigger>
            <Portal>
              <PopoverContent {...popoverContentProps} className="w-auto px-6">
                {header && (
                  <PopoverHeader {...popoverHeaderProps}>
                    {header}
                  </PopoverHeader>
                )}
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody {...popoverBodyProps}>
                  {isOpen && children}
                </PopoverBody>
                {footer && (
                  <PopoverFooter {...popoverFooterProps}>
                    {footer}
                  </PopoverFooter>
                )}
              </PopoverContent>
            </Portal>
          </>
        )}
      </ChakraPopover>
    );
  return (
    <ChakraPopover {...popoverProps}>
      <>
        <PopoverTrigger>{trigger}</PopoverTrigger>
        <PopoverContent {...popoverContentProps} className="w-auto px-6">
          {header && (
            <PopoverHeader {...popoverHeaderProps}>{header}</PopoverHeader>
          )}
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody {...popoverBodyProps}>{children}</PopoverBody>
          {footer && (
            <PopoverFooter {...popoverFooterProps}>{footer}</PopoverFooter>
          )}
        </PopoverContent>
      </>
    </ChakraPopover>
  );
}
