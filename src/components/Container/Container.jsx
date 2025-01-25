import css from "./Container.module.css";

export const Container = ({ children, paddingLeft, paddingRight }) => {
  const containerStyle = {
    paddingLeft: paddingLeft || "128px",
    paddingRight: paddingRight || "128px",
  };
  return (
    <div className={css.container} style={containerStyle}>
      {children}
    </div>
  );
};
