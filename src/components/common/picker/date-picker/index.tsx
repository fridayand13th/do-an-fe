// import React, {
//   forwardRef,
// } from 'react';
// import ReactDatePicker, {
//   ReactDatePickerCustomHeaderProps,
//   ReactDatePickerProps,
//   registerLocale,
// } from 'react-datepicker';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import ko from 'date-fns/locale/ko';
// import moment from 'moment';
// import { Button } from '@chakra-ui/react';

// registerLocale('ko', ko);

// const DateHeader = ({
//   decreaseMonth,
//   increaseMonth,
//   date,
// }: ReactDatePickerCustomHeaderProps) => {
//   return (
//     <div className="date-picker-header">
//       <Button
//         leftIcon={<FaChevronLeft />}
//         background="transparent"
//         padding="0"
//         fontWeight={400}
//         onClick={decreaseMonth}
//       >
//         Prev
//       </Button>
//       <span className="date-picker-header-dates">
//         {moment(date).format('YYYY')}
//         {'년 '}
//         {moment(date).format('MM')}
//         {'월'}
//       </span>
//       <Button
//         rightIcon={<FaChevronRight />}
//         padding="0"
//         fontWeight={400}
//         background="transparent"
//         onClick={increaseMonth}
//       >
//         Next
//       </Button>
//     </div>
//   );
// };

// const DateInputButton = forwardRef(
//   (
//     {
//       value,
//       onClick,
//     }: {
//       value: any;
//       onClick: (props: any) => any;
//       range: boolean;
//       placeholderText?: string;
//     },
//     ref: React.LegacyRef<any>,
//   ) => {
//     return (
//       <Button
//         ref={ref}
//         borderRadius="60px"
//         color="#fff"
//         background="#7483d8"
//         border="none"
//         _hover={{ background: '#5665b9' }}
//         onClick={onClick}
//         size="sm"
//       >
//         {value ? value : '날짜를 선택해 주세요'}
//       </Button>
//     );
//   },
// );

// DateInputButton.displayName = 'DateInputButton';

// export default function DatePicker(
//   datePickerProps: ReactDatePickerProps & {
//     isCustomInput?: boolean;
//   },
// ) {
//   return (
//     <ReactDatePicker
//       //minDate={startDate}
//       fixedHeight
//       customInput={
//         datePickerProps.isCustomInput
//           ? datePickerProps.customInput ?? React.createElement(DateInputButton)
//           : undefined
//       }
//       renderCustomHeader={DateHeader}
//       locale="ko"
//       dateFormat="yyyy-MM-dd"
//       {...datePickerProps}
//       // renderDayContents={(day, date) => {
//       //   console.log(day, date);
//       //   return '';
//       // }}
//     ></ReactDatePicker>
//   );
// }

// /**
//  *
//  */
