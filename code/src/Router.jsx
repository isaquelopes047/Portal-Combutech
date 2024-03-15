import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import HomeAnalytics from "./pages/home-analytics";
import Layout from "./component/layout";

import Error from "./pages/error";
import Login from "./pages/login";
import LoginLayout from "./component/layout/LoginLayout";
import ForgetPassword from "./pages/forget-password";

import CadastrosVeiculos from "./pages/cadastros/CadastrosVeiculos";
import EditarVeiculo from "./pages/cadastros/EditVeiculo";

import withAuth from "./hooks/TokenValidation";
import AbastecimentosIntegrados from "./pages/Abastecimentos/Integrados/Integrados";
import AbastecimentosIntegradosEdit from "./pages/Abastecimentos/Integrados/EditIntegrado";
import CriarAbastecimento from "./pages/Abastecimentos/Integrados/CriarAbastecimento";
import AbastecimentosNaoIntegrados from "./pages/Abastecimentos/NaoIntegrado/NaoIntegrado";
import AbastecimentosNaoIntegradosEdit from "./pages/Abastecimentos/NaoIntegrado/EditarNaoIntegrado";
import CadastrosPostos from "./pages/cadastros/postos/postos";
import AbastecimentoPosto from "./pages/Posto/Abastecimento/AbastecimentoPosto";
import ConfirmPassword from "./pages/confirm-password";
import Usuario from "./pages/usuario/usuario";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginLayout,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/confirm-password",
        element: <ConfirmPassword />,
      },
    ],
  },
  {
    path: "/auth",
    Component: withAuth(Layout),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "usuario",
        element: <Usuario />,
      },
      {
        path: "ajuda",
        element: <CadastrosVeiculos />,
      },

      /* Cadastros */
      {
        path: "cadastros/veiculos",
        element: <CadastrosVeiculos />,
      },
      {
        path: "cadastros/veiculos/edit/:id",
        element: <EditarVeiculo />,
      },
      {
        path: "cadastros/postos",
        element: <CadastrosPostos />,
      },
      {
        path: "cadastros/postos/edit/:id",
        element: <EditarVeiculo />,
      },
      {
        path: "cadastros/modelos",
        element: <CadastrosVeiculos />,
      },
      {
        path: "cadastros/modelos/edit/:id",
        element: <EditarVeiculo />,
      },
      {
        path: "cadastros/motoristas",
        element: <CadastrosVeiculos />,
      },
      {
        path: "cadastros/motoristas/edit/:id",
        element: <EditarVeiculo />,
      },
      {
        path: "cadastros/marcas",
        element: <CadastrosVeiculos />,
      },
      {
        path: "cadastros/marcas/edit/:id",
        element: <EditarVeiculo />,
      },
      {
        path: "cadastros/modelocarroceria",
        element: <CadastrosVeiculos />,
      },
      {
        path: "cadastros/modelocarroceria/edit/:id",
        element: <EditarVeiculo />,
      },
      {
        path: "cadastros/tiporodado",
        element: <CadastrosVeiculos />,
      },
      {
        path: "cadastros/tiporodado/edit/:id",
        element: <EditarVeiculo />,
      },
      {
        path: "cadastros/atividades",
        element: <CadastrosVeiculos />,
      },
      {
        path: "cadastros/atividades/edit/:id",
        element: <EditarVeiculo />,
      },
      /* End Cadastros */

      /* Abastecimentos */
      {
        path: "abastecimentos/integrados",
        element: <AbastecimentosIntegrados />,
      },
      {
        path: "abastecimentos/integrados/cad",
        element: <CriarAbastecimento />
      },
      {
        path: "abastecimentos/integrados/edit/:id",
        element: <AbastecimentosIntegradosEdit />,
      },
      {
        path: "abastecimentos/naointegrados",
        element: <AbastecimentosNaoIntegrados />,
      },
      {
        path: "abastecimentos/naointegrados/edit/:id",
        element: <AbastecimentosNaoIntegradosEdit />,
      },
      /* end abastecimentos */

      /* Posto */
      {
        path: "posto/abastecimento",
        element: <AbastecimentoPosto />,
      }
    ],
  },
  {
    path: "/error-page",
    element: <Error />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;