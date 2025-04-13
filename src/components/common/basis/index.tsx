import { TBasisProps } from '@@types/components/commons/basis';
import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';

export default function Basis({
  children,
  basis,
  columnGap,
  direction = 'row',
  alignItems,
  ...props
}: TBasisProps) {
  const basisArray = useMemo(() => {
    if (Array.isArray(basis)) return basis;
    const splitBasis = basis.split('/');
    if (basis.includes('px')) return splitBasis;
    const total = splitBasis.reduce((prev, value) => (prev += +value), 0);
    return splitBasis.map((_basis) => (+_basis / total) * 100 + '%');
  }, [basis]);

  return (
    <Box
      className="flex"
      columnGap={columnGap || 0}
      w={props.width}
      flexDir={direction}
      alignItems="stretch"
      alignContent="stretch"
    >
      <>
        {Array.isArray(children) ? (
          children.map((_child, index) => (
            <Box
              key={index}
              flexBasis={basisArray[index] || 'auto'}
              flex={!basisArray[index] ? '1' : undefined}
            >
              {_child}
            </Box>
          ))
        ) : (
          <Box>{children}</Box>
        )}
      </>
    </Box>
  );
}
