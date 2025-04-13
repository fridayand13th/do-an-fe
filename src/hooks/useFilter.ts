import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { FormEvent, useRef, useState } from 'react';
type TFilterType = 'search' | 'sort' | 'query';
type TUseFilterProps<T> = {
  filters: DeepPartial<T>;
};

type TCommonOptions = {
  initValue?: any;
  isQS?: boolean;
  setValue?: (value: any) => any;
};

type TSearchOptions = { type: 'search'; category: string } & TCommonOptions;
type TSortOptions = { type: 'sort'; order?: 'desc' | 'asc' } & TCommonOptions;
type TQueryOptions = { type: 'query'; isInitPage?: boolean } & TCommonOptions;

type DeepPartial<T> = {
  [K in keyof T]?: TSearchOptions | TSortOptions | TQueryOptions;
};

type FieldValues = Record<string, any>;

export type TRegisterFilterOptions = {
  eventType?: 'onClick' | 'onChange';
  isRef?: boolean;
  value?: string | number;
};

export type TRegisterFilter<T = FieldValues> = (
  name: string,
  options: TRegisterFilterOptions,
) => any;

const setInitFilterValue = <T>(
  filters: TUseFilterProps<T>['filters'],
  query: ParsedUrlQuery,
) => {
  return Object.keys(filters).reduce((acc, key) => {
    const option = filters[key as keyof typeof filters];
    const initValue = option?.initValue;
    const _setValue = option?.setValue;
    if (initValue && Array.isArray(initValue)) {
      let _value = query[key as any] || initValue || [];
      if (typeof _value === 'string') {
        _value = _value.split(',');
      }
      acc = {
        ...acc,
        [key]: _setValue ? _setValue(_value) : _value,
      };
      return acc;
    }
    acc = {
      ...acc,
      [key]: _setValue
        ? _setValue(query[key as any] || option?.initValue || '')
        : query[key as any] || option?.initValue || '',
    };
    return acc;
  }, {} as { [K in keyof T]: any });
};
const handleSetFilerForm = <T>(values: { [K in keyof T]: any }) => {
  return Object.entries(values).reduce((acc, [key, value]) => {
    acc[key as keyof T] = Array.isArray(value) ? value.join(',') : value;
    return acc;
  }, {} as { [K in keyof T]: any });
};

export default function useFilter<T extends FieldValues>({
  filters,
}: TUseFilterProps<T>) {
  const router = useRouter();
  const filterRef = useRef<{ [K in keyof T]: any }>(
    setInitFilterValue(filters, router.query),
  );

  const [filter, setFilter] = useState(handleSetFilerForm(filterRef.current));

  const registerFilter = (
    name: keyof typeof filters,
    {
      eventType = 'onChange',
      isRef,
      value: optionValue,
    }: TRegisterFilterOptions,
  ) => {
    const _options = filters[name];
    if (!_options) throw 'Not defined options';

    const _type = _options['type'];

    const attr = {
      [eventType]: (
        e: React.ChangeEvent<
          typeof eventType extends 'onClick'
            ? HTMLButtonElement
            : HTMLInputElement
        >,
      ) => {
        const refValue = filterRef.current[name];
        const { value } = e.target;
        let _value: any;
        if (Array.isArray(refValue)) {
          _value = refValue.includes(value)
            ? refValue.filter((_re) => _re !== value)
            : [...refValue, value];
        } else {
          _value = value;
        }

        if (!isRef) {
          setFilter((prev) => {
            let _p: { [K in keyof T]: any } = { ...prev };
            switch (_type) {
              case 'search':
                _p = { ...prev, [name]: _value, page: 1 };
                break;
              case 'sort':
                _p = { ...prev, sortKey: name, order: 'desc' };
                break;
              case 'query':
                _p = _options.isInitPage
                  ? { ...prev, [name]: _value, page: 1 }
                  : { ...prev, [name]: _value };
                break;
            }
            router.push({
              pathname: router.pathname,
              query: { ...router.query, ..._p },
            });
            if ('page' in _p) {
              delete _p['page'];
            }
            return handleSetFilerForm(_p);
          });
        }

        filterRef.current[name] = _value;
      },
      ref: isRef ? { current: filterRef.current[name] } : undefined,
      defaultValue: filterRef.current[name],
      name,
    };

    if (!_options.initValue || !Array.isArray(_options.initValue)) return attr;

    return {
      ...attr,
      isChecked: Array.isArray(filterRef.current[name])
        ? filterRef.current[name].includes(optionValue)
        : undefined,
    };
  };

  const handleFilterSubmit = ({
    onSubmitValid,
    isInitPage,
  }: {
    onSubmitValid?: (values: { [K in keyof T]: any }) => {
      [K in keyof T]: any;
    };
    isInitPage?: boolean;
  } = {}) => {
    return (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const _query = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value?.isQS) (acc as any)[key] = filterRef.current[key];
        return acc;
      }, {} as { [K in keyof T]: any });
      const query = isInitPage
        ? { ...router.query, ..._query, page: 1 }
        : { ...router.query, ..._query };
      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true },
      );

      if (!onSubmitValid) {
        setFilter(handleSetFilerForm(filterRef.current));
        return;
      }
      const result = onSubmitValid(handleSetFilerForm(filterRef.current));
      if (!result) setFilter(handleSetFilerForm(filterRef.current));
      setFilter(handleSetFilerForm(result || filterRef.current));
    };
  };

  const setFilterValue = (name: keyof typeof filters, value: any) => {
    if (filters[name]?.isQS) {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, [name]: value },
        },
        undefined,
        { shallow: true },
      );
    }
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const setFilterValues = (values: Record<keyof typeof filters, any>) => {
    const queryObj = Object.keys(values).reduce((acc, key) => {
      if (filters[key]?.isQS) acc[key] = values[key];
      return acc;
    }, {} as any);

    router.push(
      { pathname: router.pathname, query: { ...router.query, ...queryObj } },
      undefined,
      { shallow: true },
    );

    setFilter((prev) => ({ ...prev, ...values }));
  };
  return {
    filter,
    registerFilter,
    handleFilterSubmit,
    setFilterValue,
    setFilterValues,
  };
}
