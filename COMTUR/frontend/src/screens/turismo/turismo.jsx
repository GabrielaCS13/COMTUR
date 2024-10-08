import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import axios from "axios";
import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import Tabela from "../../components/table/tabela.jsx";
import BtnAcao from "../../components/botoes/btnAcao.jsx";
import { useNavigate } from "react-router-dom";
import BtnModaisIMG from "../../components/botoes/btnModais.jsx";
import BtnModais from "../../components/botoes/btnModais.jsx";
import PopupCadastrado from "../../components/popups/popupCadastro.jsx";
import PopupEditado from "../../components/popups/popupEditado.jsx";
import PopupExcluido from "../../components/popups/popupExcluido.jsx";

const Turismo = () => {
  const baseUrl = "https://localhost:7256/api/Turismo";
  const baseUrlImagem = "https://localhost:7256/api/ImagemTurismo";
  const baseUrlTipoTurismo = "https://localhost:7256/api/TipoTurismo";
  const [data, setData] = useState([]);
  const [atualizarData, setAtualizarData] = useState(true);
  const [dataTipoTurismo, setDataTipoTurismo] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userType, setUserType] = useState(null);

  const [modalCadastrado, setModalCadastrado] = useState(false);
  const [modalExcluido, setModalExcluido] = useState(false);
  const [modalEditado, setModalEditado] = useState(false);

  const [modalInserir, setModalInserir] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [turismoNome, setTurismoNome] = useState("");
  const [turismoDescricao, setTurismoDescricao] = useState("");
  const [turismoHorario, setTurismoHorario] = useState("");
  const [turismoQrCode, setTurismoQrCode] = useState("");
  const [turismoLocal, setTurismoLocal] = useState("");
  const [turismoDias, setTurismoDias] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [turismoImagem, setTurismoImagem] = useState([]);
  const [turismoLegendaImagens, setTurismoLegendaImagens] = useState([]);
  const [turismoIdTipo, setTurismoIdTipo] = useState("");
  const [turismoTipoSelecionado, setTurismoTipoSelecionado] = useState(null);
  const [turismoTipoOpcao, setTurismoTipoOpcao] = useState([]);
  const [turismoId, setTurismoId] = useState("");

  const navigate = useNavigate();

  const toggleModalCadastro = () => setModalCadastrado(!modalCadastrado);
  const toggleModalEdita = () => setModalEditado(!modalEditado);
  const toggleModalExclui = () => setModalExcluido(!modalExcluido);

  const limparDados = () => {
    setTurismoNome("");
    setTurismoDescricao("");
    setTurismoHorario("");
    setTurismoQrCode("");
    setTurismoLocal("");
    setTurismoDias("");
    setTurismoImagem("");
    setTurismoLegendaImagens("");
    setTurismoId("");
  };

  const TurismoSet = (turismo, opcao) => {
    console.log("turismo que foi passado: ", turismo);
    setTurismoId(turismo.id);
    setTurismoNome(turismo.nome);
    setTurismoDescricao(turismo.descricao);
    setTurismoHorario(turismo.horario);
    setTurismoQrCode(turismo.qrCode);
    setTurismoLocal(turismo.local);
    setTurismoDias(turismo.diaFuncionamento);
    setTurismoIdTipo(turismo.idTipoTurismo);

    setTurismoImagem(turismo.imagemTurismo);

    if (opcao === "Editar") {
      abrirFecharModalEditar(/*id*/);
    } else if (opcao === "Excluir") {
      abrirFecharModalDeletar();
    } else {
      navigate(`/visualizarTurismo/${turismo.id}`);
    }
  };

  //   const VisualizarTurismos = () => {
  //     navigate(`/todosturismos`);
  //   };

  const abrirFecharModalInserir = () => {
    modalInserir ? limparDados() : null;
    setModalInserir(!modalInserir);
  };

  const abrirModalCadastrado = () => {
    setModalCadastrado(true);
  };

  const fecharModalCadastrado = () => {
    setModalCadastrado(false);
  };

  const abrirModalExcluido = () => {
    setModalExcluido(true);
  };

  const fecharModaExcluido = () => {
    setModalExcluido(false);
  };

  const abrirModalEditado = () => {
    setModalEditado(true);
  };

  const fecharModaEditado = () => {
    setModalEditado(false);
  };

  const abrirFecharModalEditar = async (id) => {
    modalEditar ? limparDados() : null;
    setModalEditar(!modalEditar);
  };

  const abrirFecharModalDeletar = () => {
    modalDeletar ? limparDados() : null;
    setModalDeletar(!modalDeletar);
  };

  const pedidoGet = async () => {
    await axios
      .get(baseUrl)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function convertImageToBase64(imageFile, callback) {
    if (!imageFile) {
      callback(false);
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result;
      callback(base64String);
    };

    reader.onerror = () => {
      callback(false);
    };

    reader.readAsDataURL(imageFile);
  }

  const pedidoGetTipoTurismo = async () => {
    await axios
      .get(baseUrlTipoTurismo)
      .then((response) => {
        setDataTipoTurismo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pedidoPost = async () => {
    const formData = new FormData();
    formData.append("nome", turismoNome);
    formData.append("descricao", turismoDescricao);
    formData.append("horario", turismoHorario);
    formData.append("qrCode", turismoQrCode);
    formData.append("local", turismoLocal);
    formData.append("diaFuncionamento", turismoDias);
    formData.append("idUsuario", idUsuario);
    formData.append("idTipoTurismo", turismoTipoSelecionado);
    formData.append("status", 1);

    try {
      const response = await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setData(data.concat(response.data));

      if (turismoImagem.length !== 0) {
        await pedidoPostImagens(response.data.id);
      }

      abrirFecharModalInserir();
      limparDados();
      setAtualizarData(true);
      toggleModalCadastro(); // Sempre abrir o modal, mesmo que não tenha imagens
    } catch (error) {
      console.log(error);
    }
  };

  const pedidoPostImagens = async (idTurismo) => {
    const formData = new FormData();
    console.log("chegou");

    let todasImagens = [];
    let todasLegendas = [];

    turismoImagem?.forEach((imagem) => {
      todasImagens = [...todasImagens, imagem.imagem];
      todasLegendas = [...todasLegendas, imagem.legendaImagem];
    });

    console.log(idTurismo);
    console.log(todasImagens);
    console.log(todasLegendas);

    todasImagens.forEach((imagem) => formData.append("imagens", imagem));
    todasLegendas.forEach((legenda) => formData.append("legendas", legenda));
    console.log(idUsuario);
    formData.append("idUsuario", idUsuario);

    try {
      const response = await axios.post(
        baseUrlImagem + `/${idTurismo}/CadastrarImagensTurismo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  async function pedidoAtualizar() {
    const formData = new FormData();
    console.log([turismoImagem]);
    formData.append("id", turismoId);
    formData.append("nome", turismoNome);
    formData.append("descricao", turismoDescricao);
    formData.append("horario", turismoHorario);
    formData.append("imagem", turismoImagem);
    formData.append("qrCode", turismoQrCode);
    formData.append("local", turismoLocal);
    formData.append("diaFuncionamento", turismoDias);
    formData.append("idUsuario", idUsuario);
    formData.append("idTipoTurismo", turismoTipoSelecionado);

    try {
      const response = await axios.put(`${baseUrl}/${turismoId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const atualizaTurismo = response.data;

      setData((prevData) => {
        return prevData.map((turismo) => {
          if (turismo.id === turismoId) {
            return atualizaTurismo;
          }
          return turismo;
        });
      });

      abrirFecharModalEditar();

      if (turismoImagem.lenght !== 0) {
        await pedidoPutImagens();
      }

      setAtualizarData(true);
      toggleModalEdita();
    } catch (error) {
      console.log(error);
    }
  }

  const pedidoPutImagens = async () => {
    const formData = new FormData();

    let todasImagens = [];
    let todasLegendas = [];

    turismoImagem?.forEach((imagem) => {
      todasImagens = [...todasImagens, imagem.imagem];
      todasLegendas = [...todasLegendas, imagem.legendaImagem];
    });

    todasImagens.forEach((imagem) => formData.append("imagens", imagem));
    todasLegendas.forEach((legenda) => formData.append("legendas", legenda));
    formData.append("idUsuario", idUsuario);

    console.log(todasImagens);
    console.log(todasLegendas);

    try {
      const response = await axios.put(
        baseUrlImagem + `/${turismoId}/AtualizarImagensTurismo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const removeImagemByIndex = (indexToRemove) => {
    setTurismoImagem((prevImagens) =>
      prevImagens.filter((_, index) => index !== indexToRemove)
    );
  };

  const pedidoDeletar = async () => {
    await axios
      .delete(baseUrl + "/" + turismoId)
      .then((response) => {
        const novoTurismo = data.filter(
          (turismo) => turismo.id !== response.data
        );
        setData(novoTurismo);
        abrirFecharModalDeletar();
        limparDados();
        setAtualizarData(true);
        toggleModalExclui();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (atualizarData) {
      pedidoGet();
      pedidoGetTipoTurismo();
      setAtualizarData(false);
    }
  }, [atualizarData]);

  useEffect(() => {
    if (dataTipoTurismo) {
      const options = dataTipoTurismo.map((turismo) => {
        return { value: turismo.id, label: turismo.nome };
      });
      setTurismoTipoOpcao(options);

      // Verificar se o tipoAtracaoSelecionada ainda é válido, se não for, atualizá-lo
      if (!options.some((option) => option.value === turismoTipoSelecionado)) {
        const turismoPadrao = options.length > 0 ? options[0].value : "";

        setTurismoTipoSelecionado(turismoPadrao);
        setTurismoIdTipo(turismoPadrao);
      }
    }
  }, [dataTipoTurismo]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Função para pegar uma parte específica da lista
  const getCurrentPageItems = (page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Renderiza os itens da página atual
  const currentItems = getCurrentPageItems(currentPage);

  useEffect(() => {
    const userTypeFromLocalStorage = localStorage.getItem("tipoUsuario");
    const idTipoUsuarioAPI = localStorage.getItem("id");
    setUserType(userTypeFromLocalStorage);
    setIdUsuario(idTipoUsuarioAPI);
  }, []);

  const statusColors = {
    1: "bg-gray-800 text-white", // cinza para Em Análise
    2: "bg-[#009688] text-white", // verde escuro para Aprovado
    3: "bg-[#FF6B6B] text-white", // Vermelho claro para Reprovado
    4: "bg-gray-400 text-white", // Cinza claro para Desativado
  };
  
  const statusOptions = [
    { value: '', label: 'Todos' },
    { value: '1', label: 'Em Análise' },
    { value: '2', label: 'Aprovado' },
    { value: '3', label: 'Reprovado' },
    { value: '4', label: 'Desativado' }
  ];
  const apresentaDados = Array.isArray(currentItems)
    ? currentItems.map((turismo) => {
        const tipoTurismo = dataTipoTurismo.find(
          (tipo) => tipo.id === turismo.idTipoTurismo
        );
        const tipoTurismoNome = tipoTurismo
          ? tipoTurismo.nome
          : "Tipo não encontrado";
        return {
          id: turismo.id,
          nome:
            turismo.nome.length > 20
              ? `${turismo.nome.substring(0, 20)}...`
              : turismo.nome,
          descricao:
            turismo.descricao.length > 20
              ? `${turismo.descricao.substring(0, 20)}...`
              : turismo.descricao,
          tipo: tipoTurismoNome,
          status: (
            <div className={`px-3 py-1 rounded-md ${statusColors[turismo.status]}`}>
              {statusOptions.find(option => option.value === turismo.status.toString())?.label}
            </div>
          ),
          acoes: (
            <div className="flex items-center justify-center border-t-[1px] gap-2 border-gray-100 py-2">
              <BtnAcao
                funcao={() => TurismoSet(turismo, "Editar")}
                acao="Editar"
              />
              <BtnAcao
                funcao={() => TurismoSet(turismo, "Excluir")}
                acao="Excluir"
              />
              <BtnAcao
                funcao={() => TurismoSet(turismo, "Visualizar")}
                acao="Visualizar"
              />
            </div>
          ),
        };
      })
    : [];

  if (userType === "1" || userType === "3") {
    return <Navigate to="/notfound" />;
  } else {
    return (
      <div className="home">
        <div className="h-screen flex fixed">
          <SidebarAdm setOpen={setSidebarOpen} open={sidebarOpen} />
        </div>
        <div
          className="flex-1 container-fluid"
          style={{ paddingLeft: sidebarOpen ? 200 : 100 }}
        >
          <NavBarAdm />
          <div className="pl-8 pr-8 pt-[20px]">
            <h1 className="text-3xl font-semibold pb-2">Lista de Turismos</h1>
            <hr className="pb-4 border-[2.5px] border-gray-300" />
            <Tabela
              object={apresentaDados}
              colunas={["ID", "Nome", "Descrição", "Tipo", "Status", "Ações"]}
              currentPage={currentPage}
              totalPages={totalPages}
              goToPage={setCurrentPage}
              numColunas={6}
            />

            <div className="inline-flex float-right py-6">
              <BtnAcao funcao={""} acao="Publicados" />

              <BtnAcao
                funcao={() => abrirFecharModalInserir("Cadastrar")}
                acao="Cadastrar"
              />

              <BtnAcao
                funcao={() => navigate(`/tipoturismo`)}
                acao="CadastrarTipo"
                objeto="Tipo"
              />


            </div>
          </div>
        </div>

        <Modal
          className="modal-xl-gridxl"
          isOpen={modalInserir}
          style={{ maxWidth: "1000px" }}
        >
          <ModalHeader className="">Cadastrar Turismo</ModalHeader>
          <ModalBody className="">
            <div className="grid grid-cols-2 ">
              <div className="form-group  ">
                <div className="flex flex-col col-span-1 pr-6">
                  <label>Nome: </label>
                  <input
                    type="text"
                    className="form-control text-sm"
                    onChange={(e) => setTurismoNome(e.target.value)}
                    placeholder="Digite o Nome"
                  />
                  <br />

                  <label>Descrição:</label>
                  <textarea
                    className="form-control text-sm"
                    onChange={(e) => setTurismoDescricao(e.target.value)}
                    placeholder="Digite a Descrição"
                  />
                  <br />

                  <label>Horário:</label>
                  <textarea
                    className="form-control text-sm"
                    onChange={(e) => setTurismoHorario(e.target.value)}
                    placeholder="Digite o Horário"
                  />
                  <br />

                  <label>QrCode:</label>
                  <textarea
                    className="form-control text-sm"
                    onChange={(e) => setTurismoQrCode(e.target.value)}
                    placeholder="Digite o QrCode"
                  />
                  <br />

                  <label>Local:</label>
                  <textarea
                    className="form-control text-sm"
                    onChange={(e) => setTurismoLocal(e.target.value)}
                    placeholder="Digite o Local"
                  />
                  <br />

                  <label>Dia de Funcionamento:</label>
                  <textarea
                    className="form-control text-sm"
                    onChange={(e) => setTurismoDias(e.target.value)}
                    placeholder="Digite o Dia de Funcionamento"
                  />
                  <br />
                  <label>Tipo de Turismo: </label>
                  <br />
                  <select
                    className="form-control"
                    value={turismoTipoSelecionado}
                    onChange={(e) => setTurismoTipoSelecionado(e.target.value)}
                  >
                    {turismoTipoOpcao.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <br />
                </div>
              </div>

              <div className="flex flex-col col-span-1 pl-4  border-l-[1px]">
                <label>Imagem:</label>
                <div>
                  {/* Campo para seleção de imagem */}
                  <input
                    type="file"
                    className="form-control "
                    onChange={(e) => {
                      convertImageToBase64(e.target.files[0], (result) => {
                        if (result) {
                          const objetoImagem = {
                            imagem: result,
                            legendaImagem: "",
                          };
                          setTurismoImagem((prevImagens) => [
                            ...prevImagens,
                            objetoImagem,
                          ]);
                        }
                        // Limpa o campo de entrada de arquivo após a seleção
                        e.target.value = null;
                      });
                    }}
                    multiple
                  />

                  {(Array.isArray(turismoImagem) ? turismoImagem : []).map(
                    (imagem, index) =>
                      index % 1 === 0 && (
                        <div
                          className="flex pt-3 justify-end "
                          key={`row-${index}`}
                        >
                          {Array.from(
                            {
                              length: Math.min(1, turismoImagem.length - index),
                            },
                            (_, i) => (
                              <div key={index} className="flex flex-col  pr-5 ">
                                <div className="flex w-[140px] justify-end">
                                  <img
                                    className="w-min-[140px] h-[100px] mr-2 mt-2 justify-center rounded-md"
                                    src={turismoImagem[index + i].imagem}
                                    alt={`Imagem ${index}`}
                                  />
                                  <div className="flex flex-col pl-3 justify-end">
                                    <label>Legenda:</label>
                                    <input
                                      type="text"
                                      className="form-control text-sm w-[286px] mb-0 "
                                      onChange={(e) =>
                                        setTurismoImagem((prevImagens) => {
                                          const novasImagens = [...prevImagens];
                                          novasImagens[
                                            index + i
                                          ].legendaImagem = e.target.value;
                                          return novasImagens;
                                        })
                                      }
                                      placeholder="Digite a legenda"
                                    />
                                    <br />
                                    <button
                                      className="w-[140px] rounded-md text-md text-white  bg-red-800 hover:bg-red-900"
                                      onClick={() => removeImagemByIndex(index)}
                                    >
                                      Remover
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-between items-center px-[405px] ">
              <BtnModaisIMG funcao={() => pedidoPost()} acao="Cadastrar" />
              <BtnModaisIMG
                funcao={() => abrirFecharModalInserir()}
                acao="Cancelar"
              />
            </div>
          </ModalFooter>
        </Modal>

        <PopupCadastrado
          isOpen={modalCadastrado}
          toggle={toggleModalCadastro}
          objeto="Turismo"
        />
        <Modal
          className="modal-xl-gridxl"
          isOpen={modalEditar}
          style={{ maxWidth: "1000px" }}
        >
          <ModalHeader className="">Editar Turismo</ModalHeader>
          <ModalBody className="">
            <div className="grid grid-cols-2 ">
              <div className="form-group  ">
                <div className="flex flex-col col-span-1 pr-6">
                  <label>Nome: </label>
                  <input
                    type="text"
                    className="form-control text-sm"
                    onChange={(e) => setTurismoNome(e.target.value)}
                    placeholder="Digite o Nome"
                    value={turismoNome}
                  />
                  <br />

                  <label>Descrição:</label>
                  <textarea
                    className="form-control text-sm"
                    onChange={(e) => setTurismoDescricao(e.target.value)}
                    placeholder="Digite a Descrição"
                    value={turismoDescricao}
                  />
                  <br />

                  <label>Horário:</label>
                  <textarea
                    className="form-control text-sm"
                    onChange={(e) => setTurismoHorario(e.target.value)}
                    placeholder="Digite o Horário"
                    value={turismoHorario}
                  />
                  <br />

                  <label>QrCode:</label>
                  <textarea
                    className="form-control text-sm"
                    onChange={(e) => setTurismoQrCode(e.target.value)}
                    placeholder="Digite o QrCode"
                    value={turismoQrCode}
                  />
                  <br />

                  <label>Local:</label>
                  <textarea
                    className="form-control text-sm"
                    onChange={(e) => setTurismoLocal(e.target.value)}
                    placeholder="Digite o Local"
                    value={turismoLocal}
                  />
                  <br />

                  <label>Dia de Funcionamento:</label>
                  <textarea
                    className="form-control text-sm"
                    onChange={(e) => setTurismoDias(e.target.value)}
                    placeholder="Digite o Dia de Funcionamento"
                    value={turismoDias}
                  />
                  <br />
                  <label>Tipo de Turismo: </label>
                  <br />
                  <select
                    className="form-control"
                    value={turismoTipoSelecionado}
                    onChange={(e) => setTurismoTipoSelecionado(e.target.value)}
                  >
                    {turismoTipoOpcao.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <br />
                </div>
              </div>

              <div className="flex flex-col col-span-1 pl-4  border-l-[1px]">
                <label>Imagem:</label>
                <div>
                  {/* Campo para seleção de imagem */}
                  <input
                    type="file"
                    className="form-control "
                    onChange={(e) => {
                      Array.from(e.target.files).forEach((file) => {
                        convertImageToBase64(file, (result) => {
                          if (result) {
                            const objetoImagem = {
                              imagem: result,
                              legendaImagem: "",
                            };
                            setTurismoImagem((prevImagens) => [
                              ...prevImagens,
                              objetoImagem,
                            ]);
                          }
                        });
                      });
                      // Limpa o campo de entrada de arquivo após a seleção
                      e.target.value = null;
                    }}
                    multiple
                  />

                  {modalEditar && (
                    <div>
                      {(Array.isArray(turismoImagem) ? turismoImagem : []).map(
                        (imagem, index) =>
                          index % 1 === 0 && (
                            <div
                              className="flex pt-3 justify-end "
                              key={`row-${index}`}
                            >
                              {Array.from(
                                {
                                  length: Math.min(
                                    1,
                                    turismoImagem.length - index
                                  ),
                                },
                                (_, i) => (
                                  <div
                                    key={index + i}
                                    className="flex flex-col  pr-5 "
                                  >
                                    <div className="flex w-[140px] justify-end">
                                      <img
                                        className="w-min-[140px] h-[100px] mr-2 mt-2 justify-center rounded-md"
                                        src={turismoImagem[index + i].imagem}
                                        alt={`Imagem ${index}`}
                                      />
                                      <div className="flex flex-col pl-3 justify-end">
                                        <label>Legenda:</label>
                                        <input
                                          type="text"
                                          className="form-control text-sm w-[286px] mb-0 "
                                          onChange={(e) =>
                                            setTurismoImagem((prevImagens) => {
                                              const novasImagens = [
                                                ...prevImagens,
                                              ];
                                              novasImagens[
                                                index + i
                                              ].legendaImagem = e.target.value;
                                              return novasImagens;
                                            })
                                          }
                                          value={
                                            turismoImagem[index + i]
                                              .legendaImagem
                                          }
                                          placeholder="Digite a legenda"
                                        />
                                        <br />
                                        <button
                                          className="w-[140px] rounded-md text-md text-white  bg-red-800 hover:bg-red-900"
                                          onClick={() =>
                                            removeImagemByIndex(index)
                                          }
                                        >
                                          Remover
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <BtnModaisIMG funcao={() => pedidoAtualizar()} acao="Editar" />
            <BtnModaisIMG
              funcao={() => abrirFecharModalEditar()}
              acao="Cancelar"
            />
          </ModalFooter>
        </Modal>
        <PopupEditado
          isOpen={modalEditado}
          toggle={toggleModalEdita}
          objeto="Turismo"
        />

        <Modal isOpen={modalDeletar}>
          <ModalBody>
            <label> Confirma a exclusão de "{turismoNome}" ?</label>
          </ModalBody>
          <ModalFooter>
            <BtnModais funcao={() => pedidoDeletar()} acao="Excluir" />
            <BtnModais funcao={() => abrirFecharModalDeletar()} acao="Cancelar" />
          </ModalFooter>
        </Modal>

        <PopupExcluido
          isOpen={modalExcluido}
          toggle={toggleModalExclui}
          objeto="Turismo"
        />
      </div>
    );
  }
};

export default Turismo;
