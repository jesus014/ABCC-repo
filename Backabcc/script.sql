USE [abcc]
GO
/****** Object:  Table [dbo].[articulos]    Script Date: 07/11/2022 11:26:12 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[articulos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[sku] [int] NULL,
	[articulo] [varchar](15) NULL,
	[marca] [varchar](15) NULL,
	[modelo] [varchar](20) NULL,
	[departamento] [int] NULL,
	[clase] [int] NULL,
	[familia] [int] NULL,
	[fechaAlta] [date] NULL,
	[stock] [int] NULL,
	[cantidad] [int] NULL,
	[descontinuado] [int] NULL,
	[fechaBaja] [date] NULL,
 CONSTRAINT [PK_articulos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[clase]    Script Date: 07/11/2022 11:26:12 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[clase](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NumeroClase] [varchar](50) NULL,
	[NombreClase] [varchar](80) NULL,
 CONSTRAINT [PK_clase] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[departamentos]    Script Date: 07/11/2022 11:26:12 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[departamentos](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NumeroDepartamento] [varchar](5) NULL,
	[NombreDepartamento] [varchar](80) NULL,
 CONSTRAINT [PK_Departamentos] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[familia]    Script Date: 07/11/2022 11:26:12 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[familia](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NumeroFamilia] [varchar](10) NULL,
	[NombreFamilia] [varchar](80) NULL,
 CONSTRAINT [PK_familia] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[actualizar_articulo]    Script Date: 07/11/2022 11:26:12 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[actualizar_articulo]
@Id int,
@sku int,
@articulo varchar(6),
@marca varchar(6),
@modelo varchar(20),
@departamento int,
@clase int,
@familia int,
@fechaAlta date,
@stock int,
@cantidad int,
@descontinuado int,
@fechaBaja date
	
AS
BEGIN

update articulos set  sku=@sku,articulo=@articulo,marca=@marca,modelo=@modelo,departamento=@departamento,clase=@clase,familia=@familia,fechaAlta=@fechaAlta,stock=@stock,
			cantidad=@cantidad,descontinuado=@descontinuado,fechaBaja=@fechaBaja
where Id=@Id
END
GO
/****** Object:  StoredProcedure [dbo].[eliminar_articulo]    Script Date: 07/11/2022 11:26:12 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[eliminar_articulo]
@Id int

AS
BEGIN

delete from articulos where Id = @Id

END
GO
/****** Object:  StoredProcedure [dbo].[insertar_articulos]    Script Date: 07/11/2022 11:26:12 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[insertar_articulos]
	-- Add the parameters for the stored procedure here
@sku int,
@articulo varchar(6),
@marca varchar(6),
@modelo varchar(20),
@departamento int,
@clase int,
@familia int,
@fechaAlta date,
@stock int,
@cantidad int,
@descontinuado int,
@fechaBaja date

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
insert into articulos (sku,articulo,marca,modelo,departamento,clase,familia,fechaAlta,stock,
			cantidad,descontinuado,fechaBaja)values(@sku,@articulo,@marca,@modelo,@departamento,@clase,@familia,@fechaAlta,@stock,
			@cantidad,@descontinuado,@fechaBaja)


END
GO
/****** Object:  StoredProcedure [dbo].[seleccionar_articulo]    Script Date: 07/11/2022 11:26:12 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[seleccionar_articulo]
@sku int

AS
BEGIN

SELECT a.Id AS Id,
	   a.sku AS sku,
	   a.articulo AS articulos,
	   a.marca AS marca,
	   a.modelo AS modelo,
	   a.departamento AS departamento,
	   a.clase AS clase,
	   a.familia AS familia,
	   a.fechaAlta AS fechaAlta,
	   a.stock AS stock,
	   a.cantidad AS cantidad,
	   a.descontinuado AS descontinuado,
	   a.fechaBaja AS fechaBaja,

	   (select d.NombreDepartamento 
	   from departamentos d
	   where a.departamento = d.Id) AS nombreDepartamento,  

	   (select c.NombreClase 
	   from clase c
	   where a.clase = c.Id) AS nombreClase,

	   (select f.NombreFamilia 
	   from familia f
	   where a.familia = f.Id) AS nombreFamilia


from articulos a

where sku=@sku;


END
GO
/****** Object:  StoredProcedure [dbo].[seleccionar_clase]    Script Date: 07/11/2022 11:26:12 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[seleccionar_clase] 
	
AS
BEGIN

select * from clase;

END
GO
/****** Object:  StoredProcedure [dbo].[seleccionar_departamentos]    Script Date: 07/11/2022 11:26:12 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[seleccionar_departamentos]

AS
BEGIN

select *from departamentos;

END
GO
/****** Object:  StoredProcedure [dbo].[seleccionar_familia]    Script Date: 07/11/2022 11:26:12 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[seleccionar_familia]
AS
BEGIN

SELECT * FROM familia;

END
GO
