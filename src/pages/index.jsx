import { useRecoilValue } from "recoil";
import { authState } from "@/state/atoms/authAtom";
import { Link } from "react-router-dom";

export default function Home() {
  const user = useRecoilValue(authState);

  return (
    <div className="bg-white rounded-xl shadow-md">
      {user ? (
        <p className="mb-4">
          Xin chào, <strong>{user.email}</strong> 👋
        </p>
      ) : (
        <p className="mb-4 text-gray-600">Bạn chưa đăng nhập. Vui lòng <Link to="/login" className="text-blue-500 underline">đăng nhập</Link> để tiếp tục.</p>
      )}

      <div className="space-y-3">
        <p>
          📅 Bạn có thể <Link to="/register" className="text-blue-600 underline">đăng ký slot đánh</Link> cho các tuần kế tiếp.
        </p>
        <p>
          📊 Thông tin quỹ nhóm sẽ được cập nhật định kỳ.
        </p>
        <p>
          🛠 Nếu bạn là admin, hãy vào <Link to="/admin" className="text-blue-600 underline">trang quản lý</Link>.
        </p>
      </div>
    </div>
  );
}
