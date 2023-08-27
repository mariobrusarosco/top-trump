import { AnimatePresence, motion, useCycle } from "framer-motion";

const items = [1, 2, 3, 4, 5];

const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: 1,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

export const Header = () => {
  const [open, cycleOpen] = useCycle(true, false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.header
            initial={{ width: 50 }}
            animate={{ width: 300 }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
            className="bg-primary-base h-full p-8"
          >
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
            >
              {items.map((item) => (
                <motion.li
                  key={item}
                  // whileHover={{ scale: 1.1 }}
                  // whileTap={{ scale: 0.95 }}
                  className="py-4"
                  variants={itemVariants}
                >
                  <motion.span>item</motion.span>
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.header>
        )}
      </AnimatePresence>
      <button onClick={() => cycleOpen()}>{open ? "close" : "open"}</button>
    </>
  );
};
