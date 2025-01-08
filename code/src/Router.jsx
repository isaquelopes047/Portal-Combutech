import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Layout from "./component/layout";

import Error from "./pages/InConstrution";
import Login from "./pages/login";
import LoginLayout from "./component/layout/LoginLayout";
import ForgetPassword from "./pages/forget-password";

import CadastrosVeiculos from "./pages/cadastros/CadastrosVeiculos";
import EditarVeiculo from "./pages/cadastros/EditVeiculo";

import CadastroMotoristas from "./pages/cadastros/motoristas/CadastroMotoristas";

import withAuth from "./hooks/TokenValidation";
import AbastecimentosIntegrados from "./pages/Abastecimentos/Integrados/Integrados";
import AbastecimentosIntegradosEdit from "./pages/Abastecimentos/Integrados/EditIntegrado";
import CriarAbastecimento from "./pages/Abastecimentos/Integrados/CriarAbastecimento";
import CriarAbastecimentoContingenciaMain from "./pages/Abastecimentos/Contingencia/CriarAbastecimento";
import AbastecimentosNaoIntegrados from "./pages/Abastecimentos/NaoIntegrado/NaoIntegrado";
import AbastecimentosNaoIntegradosEdit from "./pages/Abastecimentos/NaoIntegrado/EditarNaoIntegrado";
import CadastrosPostos from "./pages/cadastros/postos/postos";
import AbastecimentoPosto from "./pages/Posto/Abastecimento/AbastecimentoPosto";
import ConfirmPassword from "./pages/confirm-password";
import Usuario from "./pages/usuario/usuario";
import ValorNegociado from "./pages/Posto/ValorNegociado/ValorNegociado";
import MainUsuarios from "./pages/Usuarios/usuarios";
import MainDetalheUsuario from "./pages/Usuarios/detalhesUsuario";
import ValoresAprovarMain from "./pages/Posto/ValoresAprovar/ValoresAprovar";
import ControleFrotas from "./pages/Controle/ControleFrotas/ControleFrotas";
import MainCriarUsuario from "./pages/Usuarios/criarUsuario";
import AlocacaoVeiculo from "./pages/Controle/Alocacao/AlocacaoVeiculo";
import CriarAlocacao from "./pages/Controle/Alocacao/CriarAlocacao";
import PageConstruction from "./pages/InConstrution";
import MainPrevisaoRoteiro from "./pages/roteiro/PrevisaoRoteiro";
import MainTermoDeUso from "./pages/TermoDeUso";

const router = createBrowserRouter([
  {
    path: "/posto",
    Component: LoginLayout,
    children: [
      {
        path: "/posto",
        element: <Login />,
      },
      {
        path: "/posto/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/posto/confirm-password",
        element: <ConfirmPassword />,
      },
    ],
  },
  {
    path: "/posto/auth",
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
        element: <PageConstruction />,
      },
      {
        path: "cadastros/veiculos/edit/:id",
        element: <PageConstruction />
      },
      {
        path: "cadastros/postos",
        element: <PageConstruction />
      },
      {
        path: "cadastros/postos/edit/:id",
        element: <PageConstruction />
      },
      {
        path: "cadastros/modelos",
        element: <PageConstruction />
      },
      {
        path: "cadastros/modelos/edit/:id",
        element: <PageConstruction />
      },
      {
        path: "cadastros/motoristas",
        element: <PageConstruction />
      },
      {
        path: "cadastros/motoristas/edit/:id",
        element: <PageConstruction />
      },
      {
        path: "cadastros/marcas",
        element: <PageConstruction />
      },
      {
        path: "cadastros/marcas/edit/:id",
        element: <PageConstruction />
      },
      {
        path: "cadastros/modelosdecarroceria",
        element: <PageConstruction />
      },
      {
        path: "cadastros/modelosdecarroceria/edit/:id",
        element: <PageConstruction />
      },
      {
        path: "cadastros/tiporodados",
        element: <PageConstruction />
      },
      {
        path: "cadastros/tiporodados/edit/:id",
        element: <PageConstruction />
      },
      {
        path: "cadastros/atividades",
        element: <PageConstruction />
      },
      {
        path: "cadastros/atividades/edit/:id",
        element: <PageConstruction />
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
        path: "postos/abastecimento",
        element: <AbastecimentoPosto />,
      },
      {
        path: "postos/valornegociado",
        element: <ValorNegociado />,
      },
      {
        path: "postos/contingencia",
        element: <CriarAbastecimentoContingenciaMain />
      },

      /* Usuario */
      {
        path: "usuarios/usuarios",
        element: <MainUsuarios />,
      },
      {
        path: "usuarios/usuarios/edit/:id",
        element: <MainDetalheUsuario />,
      },
      {
        path: "usuarios/usuarios/criarusuario",
        element: <MainCriarUsuario />,
      },

      /* Posto */
      {
        path: "negociacao/negociacaovalores",
        element: <ValoresAprovarMain />,
      },

      /* Controle */
      {
        path: "controle/controlefrotas",
        element: <ControleFrotas />,
      },
      {
        path: "controle/alocacao",
        element: <AlocacaoVeiculo />,
      },
      {
        path: "controle/alocacao/criaralocacao",
        element: <CriarAlocacao />,
      },

      /* relatorios */
      {
        path: "relatorios/abastecimentos",
        element: <PageConstruction />
      },
      {
        path: "relatorios/volumeabastecidas",
        element: <PageConstruction />
      },
      {
        path: "relatorios/previsaoderoteiro",
        element: <MainPrevisaoRoteiro />
      },

      /* BI */
      {
        path: "BI/Abastecidas",
        element: <PageConstruction />
      },
      {
        path: "BI/AnaliticoAbastecidas",
        element: <PageConstruction />
      },

    ],
  },
  {
    path: "/error-page",
    element: <Error />,
  },
  {
    path: "/termodeusoapp",
    element: <MainTermoDeUso />,
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;