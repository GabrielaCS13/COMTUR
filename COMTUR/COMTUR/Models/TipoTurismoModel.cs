﻿using COMTUR.Models.Enum;
using COMTUR.Repositorios.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace COMTUR.Models;

[Table("tipoturismo")]

public class TipoTurismoModel
{

	[Key]
	[Column("tipoturismoid")]
	public int Id { get; set; }

    [Column("nome")]
    public string Nome { get; set; }

	[Column("imagemtipoturismo")]
	public string? Imagem { get; set; }

	// relação com Empresa
	[JsonIgnore]
	public ICollection<EmpresaModel>? Empresa { get; set; }

	// relação com Turismo
	[JsonIgnore]
	public ICollection<TurismoModel>? Turismo { get; set; }

    [JsonIgnore]
    public UsuarioModel? UsuarioModel { get; set; }

    [Column("usuarioid")]
    [ForeignKey("usuarioid")]
    public int IdUsuario { get; set; }

	[Column("statusturismo")]
	public TipoStatus Status { get; set; }

	public void Approved() => Status = StatusEnumExtensions.Approved();
	public void Inactive() => Status = StatusEnumExtensions.Inactive();
	public void Disapproved() => Status = StatusEnumExtensions.Disapproved();
	public void Analyzing() => Status = StatusEnumExtensions.Analyzing();

	public string GetState() => IStatusStateRepositorioExtensions.GetState(this.Status);
	public bool CanInactive() => IStatusStateRepositorioExtensions.CanInactive(this.Status);
	public bool CanAnalyzing() => IStatusStateRepositorioExtensions.CanAnalyzing(this.Status);
	public bool CanApproved() => IStatusStateRepositorioExtensions.CanApproved(this.Status);
	public bool CanDisapproved() => IStatusStateRepositorioExtensions.CanDisapproved(this.Status);

}
