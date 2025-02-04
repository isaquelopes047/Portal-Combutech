import React from 'react';
import { MainContainer, HeaderPage, BodyPage } from './termos-styled';
import imgLogo from '.././../assets/img/logo-icon2.png';
import { BsFileEarmarkPdfFill } from "react-icons/bs";

export default function TermoDeUso() {
    return (
        <MainContainer>
            <HeaderPage>
                <img src={imgLogo} />

                <div>
                    <h2>Termo de uso do Aplicativo Combutech</h2>
                    <p>
                        Bem-vindo ao aplicativo Combutech! Ao utilizar nosso aplicativo, você concorda com os termos e condições estabelecidos neste documento. O Combutech é uma plataforma destinada a otimizar a gestão de postos de combustíveis, facilitando a interação entre usuários, fornecedores e prestadores de serviços. É importante ler atentamente todas as condições descritas para garantir uma experiência segura e eficiente no uso de nossas funcionalidades.
                    </p>
                </div>

                <div>
                    <p>
                        Caso tenha dúvidas ou precise de mais informações sobre o uso do aplicativo, não hesite em entrar em contato com nossa equipe de suporte. Estamos disponíveis para ajudar através do e-mail suporte@combutech.com ou pelo telefone (47) 1234-5678.
                    </p>
                </div>
            </HeaderPage>
            <BodyPage>
                <div>
                    <div>
                        <BsFileEarmarkPdfFill size={50} color='#c31313' />
                        <p>Informaçõs detalhas do termo de uso do app e sistemas combutech</p>
                    </div>
                    <div>
                        <section>
                            <h2>Política de Privacidade do AppCombutech</h2>
                            <p>
                                A sua privacidade é uma prioridade para nós. Esta Política de Privacidade descreve como a AppCombutech coleta, usa e compartilha informações pessoais quando você utiliza nosso aplicativo.
                            </p>
                        </section>

                        <section>
                            <h3>Informações que Coletamos</h3>
                            <article>
                                <h4>Informações de Registro</h4>
                                <p>
                                    Ao se registrar no aplicativo, solicitamos informações pessoais, incluindo nome, endereço de e-mail, número de telefone e informações de pagamento. Esses dados são necessários para criar e gerenciar sua conta, processar transações e oferecer suporte ao cliente.
                                </p>
                            </article>

                            <article>
                                <h4>Informações de Login</h4>
                                <p>
                                    Quando você faz login no aplicativo, podemos coletar informações de autenticação, como nome de usuário e senha, para garantir a segurança da sua conta.
                                </p>
                            </article>

                            <article>
                                <h4>Informações de Localização</h4>
                                <p>
                                    Com sua permissão, podemos coletar sua localização aproximada para oferecer recursos de localização, como encontrar postos de combustível próximos. Essas informações são anonimizadas e usadas exclusivamente para melhorar sua experiência no aplicativo.
                                </p>
                            </article>

                            <article>
                                <h4>Informações de Uso</h4>
                                <p>
                                    Coletamos dados sobre como você utiliza o aplicativo, incluindo as páginas visitadas, os recursos acessados e as transações realizadas. Essas informações nos ajudam a analisar o desempenho do aplicativo, identificar áreas de melhoria e personalizar sua experiência.
                                </p>
                            </article>

                            <article>
                                <h4>Informações do Dispositivo</h4>
                                <p>
                                    Coletamos informações sobre o dispositivo que você utiliza para acessar o aplicativo, como modelo, sistema operacional e identificadores únicos. Esses dados são utilizados para otimizar o desempenho do aplicativo e garantir compatibilidade com diferentes dispositivos.
                                </p>
                            </article>
                        </section>

                        <section>
                            <h3>Como Usamos Suas Informações</h3>
                            <p>
                                Utilizamos as informações coletadas para fornecer e manter nosso aplicativo, personalizar sua experiência, analisar o uso do aplicativo e cumprir obrigações legais.
                            </p>
                        </section>

                        <section>
                            <h3>Compartilhamento de Informações</h3>
                            <p>
                                Podemos compartilhar suas informações pessoais com terceiros apenas com seu consentimento explícito, com fornecedores de serviços terceirizados e para cumprir obrigações legais.
                            </p>
                        </section>

                        <section>
                            <h3>Segurança das Informações</h3>
                            <p>
                                Implementamos medidas de segurança para proteger suas informações pessoais. No entanto, nenhum método de transmissão pela Internet ou armazenamento eletrônico é 100% seguro.
                            </p>
                        </section>

                        <section>
                            <h3>Seus Direitos de Privacidade</h3>
                            <p>
                                Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Entre em contato conosco se tiver dúvidas ou quiser exercer seus direitos.
                            </p>
                        </section>

                        <section>
                            <h3>Alterações a Esta Política de Privacidade</h3>
                            <p>
                                Podemos atualizar esta política periodicamente. Recomendamos que você a revise regularmente para estar ciente de quaisquer atualizações.
                            </p>
                        </section>

                        <section>
                            <h3>Contato</h3>
                            <p>
                                Se tiver alguma dúvida sobre nossa Política de Privacidade, entre em contato pelo e-mail: site@combutech.com.br. Esta Política de Privacidade foi atualizada pela última vez em 18/03/2024.
                            </p>
                        </section>
                    </div>
                </div>
            </BodyPage>
        </MainContainer>
    )
}