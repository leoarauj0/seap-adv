import Link from "next/link";
import styles from "./styles.module.scss";

export function Menu() {
  return (
    <div className={styles.menuContainer}>
      {/* aula 2 - 53min */}

      <div>
        <Link href={``}>
          <a>
            <h3>Início</h3>
          </a>
        </Link>
        <Link href={``}>
          <a>
            <h3>Locar</h3>
          </a>
        </Link>
        <Link href={``}>
          <a>
            <h3>Locações</h3>
          </a>
        </Link>
        <Link href={``}>
          <a>
            <h3>Cadastrar Livro</h3>
          </a>
        </Link>
      </div>
      <Link href={``}>
        <a>
          <h3>Fechar</h3>
        </a>
      </Link>
    </div>
  );
}
