/* eslint-disable no-unused-expressions */

import { useMemo, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { CartState } from "../context/Context";
import { getUniqueItems } from "../utils/utils";

const Filters = ({ totalFiltered }: any) => {
  const {
    state: { products },
    productDispatch,
    productState: { byColor, byGender, byType, byPrice },
  } = CartState();
  const [colors, setColors] = useState(byColor ?? []);
  const [gender, setGender] = useState(byGender ?? []);
  const [shirtType, setShirtType] = useState(byType ?? []);
  const [rangeValue, setRangeValue] = useState(byPrice ?? 0);
  const maxPrices = useMemo(() => {
    const priceData = products.map((d: any) => d.price);
    return Math.max(...priceData);
  }, [products]);

  /** Group items based on colors, gender or type */
  const GroupItems = (type: string) =>
    useMemo(
      () =>
        getUniqueItems(products, type).map((item: any) => ({
          label: item[type],
          name: item[type],
          value: item[type],
        })),
      [products]
    );

  /** Handle on Change event for FilterType */
  const onChange =
    (type: string, changedBy: string[], filterType: string) => (e: any) => {
      const checked = e.target.checked;
      let _changes = changedBy.slice();
      if (checked) {
        _changes.push(type);
      } else {
        _changes = _changes.filter(
          (_changeType: string) => _changeType !== type
        );
      }
      /** Dispatching the Filter Type */
      filterType === "color"
        ? setColors(_changes)
        : filterType === "gender"
        ? setGender(_changes)
        : setShirtType(_changes);

      productDispatch({
        type: `FILTER_BY_${filterType.toUpperCase()}`,
        payload: _changes,
      });
    };

  const onSliderChange = (e: any) => {
    setRangeValue(e.target.value);
    productDispatch({
      type: "FILTER_BY_PRICE",
      payload: rangeValue,
    });
  };

  /** To Clear out the Filters */
  const clearFilters = () => {
    setColors([]);
    setGender([]);
    setShirtType([]);
    productDispatch({
      type: "CLEAR_FILTERS",
    });
  };
  return (
    <div className="filters">
      <span className="title">Filter Products : {totalFiltered.length}</span>
      <div>
        <div>Colors</div>
        {GroupItems("color").map((field, key) => (
          <li key={key} style={{ listStyleType: "none" }}>
            <span>
              <Form.Check
                label={field?.name}
                inline
                name={field?.name}
                type="checkbox"
                id={field.name}
                onChange={onChange(field?.value, colors, "color")}
                checked={colors && colors.includes(field.value)}
              />
            </span>
          </li>
        ))}
      </div>

      <div>
        <div>Gender</div>
        <div className="type-filter">
          {GroupItems("gender").map((field, key) => (
            <li key={key} style={{ listStyleType: "none" }}>
              <span>
                <Form.Check
                  inline
                  label={field?.name}
                  name={field?.name}
                  type="checkbox"
                  id={field.name}
                  onChange={onChange(field?.value, gender, "gender")}
                  checked={gender && gender.includes(field.value)}
                />
              </span>
            </li>
          ))}
        </div>
      </div>

      <div>
        <div>Type</div>
        <div className="type-filter">
          {GroupItems("type").map((field, key) => (
            <li key={key} style={{ listStyleType: "none" }}>
              <span>
                <Form.Check
                  inline
                  label={field?.name}
                  name={field?.name}
                  type="checkbox"
                  id={field.name}
                  onChange={onChange(field?.value, shirtType, "type")}
                  checked={shirtType && shirtType.includes(field.value)}
                />
              </span>
            </li>
          ))}
        </div>
      </div>
      <div>
        <>
          <Form.Label>
            {" "}
            Price - <span>₹ {byPrice}</span>
          </Form.Label>
          <Form.Range
            value={byPrice}
            min={0}
            max={maxPrices}
            onChange={onSliderChange}
          />
        </>
      </div>
      <Button variant="light" style={{ marginTop: 10 }} onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
