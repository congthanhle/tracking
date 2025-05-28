import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useSetRecoilState } from "recoil";
import { isApprovedEmail } from "@/store/auth";
import { authState } from "@/state/atoms/authAtom";
import { Input, Button, Form } from "antd";
import { notification } from "antd";

export default function Login() {
  const setUser = useSetRecoilState(authState);
  const navigate = useNavigate();
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const onFinish = async (values) => {
    const email = values.email.trim().toLowerCase();
    try{
      const res = await isApprovedEmail(email)
      if (res) {
        setUser({ email });
        localStorage.setItem("userEmail", email);
        navigate("/home");
      } else {
        notification.error({
          description: "Email chưa được phê duyệt. Vui lòng liên hệ quản trị viên.",
          duration: 2,
        });
      }
    }
    catch (error) {
      notification.error({
        description: error,
        duration: 2,
      });
      return;
    }
  };

  return (
    <div className="relative w-full h-screen custom-cursor main-background">
      <Particles
        id="tsparticles"
        className="absolute inset-0 z-0"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: { value: 25, density: { enable: true, area: 500 } },
            shape: {
              type: "image",
              image: {
                src: "/shuttlecock.png",
                width: 30,
                height: 30,
              },
            },
            size: { value: 30, random: true },
            move: {
              enable: true,
              speed: 2,
              outModes: { default: "out" },
            },
            opacity: { value: 0.8, random: true },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { repulse: { distance: 50, duration: 0.2 } },
          },
          detectRetina: true,
        }}
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="bg-[#6ACADA]/10 backdrop-blur-md text-white px-6 pt-6 rounded-xl shadow-xl w-96">
          <img 
            src="https://www.animatedimages.org/data/media/417/animated-badminton-image-0041.gif"
            className="rounded-xl mb-4"
          />
            <Form
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Vui lòng nhập Email!' }]}
              >
                <Input placeholder="Email"/>
              </Form.Item>
              <Form.Item label={null}>
                <Button color="cyan" variant="solid" htmlType="submit" className="w-full mt-2">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
        </div>
      </div>
    </div>
  );
}
