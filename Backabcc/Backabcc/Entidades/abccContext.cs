using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace Backabcc.Entidades
{
    public partial class abccContext : DbContext
    {
        public abccContext()
        {
        }

        public abccContext(DbContextOptions<abccContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Articulo> Articulos { get; set; }
        public virtual DbSet<Clase> Clases { get; set; }
        public virtual DbSet<Departamento> Departamentos { get; set; }
        public virtual DbSet<Familium> Familia { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=localhost; Database=abcc; Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<Articulo>(entity =>
            {
                entity.ToTable("articulos");

                entity.Property(e => e.Articulo1)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("articulo");

                entity.Property(e => e.Cantidad)
                    .HasColumnType("decimal(9, 0)")
                    .HasColumnName("cantidad");

                entity.Property(e => e.Clase)
                    .HasColumnType("decimal(2, 0)")
                    .HasColumnName("clase");

                entity.Property(e => e.Departamento)
                    .HasColumnType("decimal(1, 0)")
                    .HasColumnName("departamento");

                entity.Property(e => e.Descontinuado)
                    .HasColumnType("decimal(1, 0)")
                    .HasColumnName("descontinuado");

                entity.Property(e => e.Familia)
                    .HasColumnType("decimal(3, 0)")
                    .HasColumnName("familia");

                entity.Property(e => e.FechaAlta)
                    .HasColumnType("date")
                    .HasColumnName("fechaAlta");

                entity.Property(e => e.FechaBaja)
                    .HasColumnType("date")
                    .HasColumnName("fechaBaja");

                entity.Property(e => e.Marca)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("marca");

                entity.Property(e => e.Modelo)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("modelo");

                entity.Property(e => e.Sku).HasColumnName("sku");

                entity.Property(e => e.Stock)
                    .HasColumnType("decimal(9, 0)")
                    .HasColumnName("stock");
            });

            modelBuilder.Entity<Clase>(entity =>
            {
                entity.ToTable("clase");

                entity.Property(e => e.NombreClase)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.NumeroClase)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Departamento>(entity =>
            {
                entity.ToTable("departamentos");

                entity.Property(e => e.NombreDepartamento)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.NumeroDepartamento)
                    .HasMaxLength(5)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Familium>(entity =>
            {
                entity.ToTable("familia");

                entity.Property(e => e.NombreFamilia)
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.NumeroFamilia)
                    .HasMaxLength(10)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
