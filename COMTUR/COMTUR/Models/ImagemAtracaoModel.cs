﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace COMTUR.Models
{
	[Table("imagematracao")]
	public class ImagemAtracaoModel
	{
		[Key]
		[Column("imagematracaoid")]
		public int Id { get; set; }

		[Column("imagem")]
		public string Imagem { get; set; }

		[Column("legendaImagem")]
		public string LegendaImagem { get; set; }

		[JsonIgnore]
		public AtracaoModel AtracaoModel { get; set; }

		[ForeignKey("idatracao")]
		public int IdAtracao { get; set; }
	}
}