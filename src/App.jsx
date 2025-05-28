import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import { useRecoilValue } from "recoil";
import { authState } from "@/state/atoms/authAtom";

function ProtectedRoute({ children }) {
  const user = useRecoilValue(authState);
  return user ? children : <Navigate to="/login" replace />;
}

function renderRoutes(config) {
  return config.map((r, i) => {
    const { path, index, element, children, protected: isProtected } = r;

    const wrapped = isProtected ? (
      <ProtectedRoute>{element}</ProtectedRoute>
    ) : (
      element
    );

    const routeProps = index ? { index: true } : { path };

    return (
      <Route key={i} {...routeProps} element={wrapped}>
        {children && renderRoutes(children)}
      </Route>
    );
  });
}

export default function App() {
  return (
    <Routes>
      {renderRoutes(routes)}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
