/* AUTO-GENERATED from oxc docs — rule react/no-clone-element. Do not edit. */

import { cloneElement } from "react";

function List({ children }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className="List">
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          isHighlighted: index === selectedIndex
        })
      )}
    </div>
  );
}
